
import { useState, useEffect } from "react";
import ChatHeader, { ChatMode } from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { ChatMessageProps } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";
import OpenAI from "openai";

// Initialize OpenAI client
// Note: In production, this key should be stored securely in environment variables
const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [mode, setMode] = useState<ChatMode>("tutor");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      // Get system prompt based on the selected mode
      const systemPrompt = getSystemPromptForMode(mode);
      
      // Create conversation history for OpenAI
      const conversationHistory = messages.map(msg => ({
        role: msg.role === "assistant" ? "assistant" as const : "user" as const,
        content: msg.content
      }));
      
      // Add the system message at the beginning
      conversationHistory.unshift({
        role: "system" as const,
        content: systemPrompt
      });
      
      // Add the new user message
      conversationHistory.push({
        role: "user" as const,
        content: message
      });
      
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // You can use "gpt-3.5-turbo" for a more cost-effective option
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 800,
      });
      
      // Extract the AI response
      const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
      
      // Add AI response to chat
      const aiMessage: ChatMessageProps = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("OpenAI API error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getSystemPromptForMode = (mode: ChatMode): string => {
    switch (mode) {
      case "tutor":
        return "You are an expert tutor assistant. Explain concepts in detail with examples. Be educational, patient, and encouraging.";
      case "writer":
        return "You are a professional content writer assistant. Help create engaging, well-structured content. Provide creative suggestions and refinements.";
      case "developer":
        return "You are an experienced developer assistant. Provide code explanations, debugging help, and programming advice with code examples when relevant.";
      case "support":
        return "You are a friendly customer support assistant. Be helpful, empathetic, and solution-oriented when addressing user concerns.";
      default:
        return "You are a helpful assistant.";
    }
  };
  
  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
    
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
