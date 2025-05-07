
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader, { ChatMode } from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { ChatMessageProps } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [mode, setMode] = useState<ChatMode>("tutor");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the chat feature.",
          variant: "destructive"
        });
        navigate('/login');
      } else {
        // Create or get an existing session
        await createOrGetSession();
      }
    };
    
    checkAuth();
  }, []);
  
  // Create or get a chat session
  const createOrGetSession = async () => {
    const { data: session } = await supabase.auth.getSession();
    
    if (session?.session) {
      // First check for existing sessions
      const { data: existingSessions } = await supabase
        .from('chat_sessions')
        .select('id')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (existingSessions && existingSessions.length > 0) {
        const sessionId = existingSessions[0].id;
        setSessionId(sessionId);
        
        // Load existing messages
        const { data: existingMessages } = await supabase
          .from('messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('timestamp', { ascending: true });
          
        if (existingMessages && existingMessages.length > 0) {
          setMessages(existingMessages.map(msg => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
            timestamp: msg.timestamp
          })));
        }
      } else {
        // Create a new session
        const newSessionId = uuidv4();
        
        const { error } = await supabase
          .from('chat_sessions')
          .insert({
            id: newSessionId,
            user_id: session.session.user.id,
            mode
          });
          
        if (!error) {
          setSessionId(newSessionId);
        } else {
          console.error("Error creating session:", error);
        }
      }
    }
  };

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: ChatMessageProps = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Get current session
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.access_token || !sessionId) {
        toast({
          title: "Session error",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      // Save user message to database
      await supabase
        .from('messages')
        .insert({
          session_id: sessionId,
          user_id: session.session.user.id,
          content: message,
          role: 'user',
          timestamp: new Date().toISOString()
        });

      // Create conversation history for OpenAI
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: message
      });
      
      // Call our Supabase Edge Function
      const response = await fetch(
        `https://nakuynzcpxgvrpxqistm.supabase.co/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.session.access_token}`
          },
          body: JSON.stringify({
            messages: conversationHistory,
            mode
          }),
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to get AI response");
      }
      
      // Extract the AI response
      const aiResponse = result.response;
      
      // Add AI response to chat
      const aiMessage: ChatMessageProps = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Save AI message to database
      await supabase
        .from('messages')
        .insert({
          session_id: sessionId,
          user_id: session.session.user.id,
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toISOString()
        });
        
    } catch (error) {
      console.error("API error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleModeChange = async (newMode: ChatMode) => {
    setMode(newMode);
    
    // Update session mode in database
    if (sessionId) {
      await supabase
        .from('chat_sessions')
        .update({ mode: newMode })
        .eq('id', sessionId);
    }
    
    // Add system message about mode change
    const systemMessage: ChatMessageProps = {
      role: "assistant",
      content: `Mode changed to ${newMode} mode. How can I help you?`,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ChatHeader mode={mode} onModeChange={handleModeChange} />
      <ChatHistory messages={messages} isLoading={isLoading} />
      <div className="p-4">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
