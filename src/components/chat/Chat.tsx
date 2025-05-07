
import { useState, useEffect } from "react";
import ChatHeader, { ChatMode } from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import { ChatMessageProps } from "./ChatMessage";
import { useToast } from "@/components/ui/use-toast";

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
      // In a real implementation, this would be an API call to GPT-4
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate AI response based on mode
      let aiResponse = "";
      
      switch (mode) {
        case "tutor":
          aiResponse = `I'm your tutor assistant. You asked: "${message}"\n\nHere's a detailed explanation of this topic...`;
          break;
        case "writer":
          aiResponse = `As a content writer, I'll help you with: "${message}"\n\nHere's a draft you can use...`;
          break;
        case "developer":
          aiResponse = `Let me help you with your code issue: "${message}"\n\nYou might want to try this approach...`;
          break;
        case "support":
          aiResponse = `Thank you for contacting support about: "${message}"\n\nI'd be happy to help resolve this issue...`;
          break;
      }
      
      // Add AI response to chat
      const aiMessage: ChatMessageProps = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
