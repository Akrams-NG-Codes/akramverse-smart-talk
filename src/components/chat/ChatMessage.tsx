
import { useState, useEffect } from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder } from "../ui/avatar-placeholder";

export type MessageRole = "user" | "assistant";

export interface ChatMessageProps {
  role: MessageRole;
  content: string;
  timestamp: string;
  isLoading?: boolean;
}

export default function ChatMessage({ role, content, timestamp, isLoading = false }: ChatMessageProps) {
  const isUser = role === "user";
  const [displayContent, setDisplayContent] = useState(isUser ? content : "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Simulate typing effect for AI responses
  useEffect(() => {
    setIsMounted(true);
    
    if (isUser || isLoading) {
      setDisplayContent(content);
      return;
    }
    
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayContent(prev => prev + content.charAt(currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, 15); // Typing speed
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, content, isUser, isLoading, isMounted]);

  useEffect(() => {
    if (!isUser) {
      setDisplayContent("");
      setCurrentIndex(0);
    }
  }, [content, isUser]);
  
  return (
    <div className={cn(
      "flex w-full mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex gap-3 max-w-3xl",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        {isUser ? (
          <AvatarPlaceholder 
            initials="U" 
            className={cn(
              "bg-akram-purple text-white",
              isUser ? "ml-2" : "mr-2"
            )}
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Bot size={20} />
          </div>
        )}
        
        {/* Message content */}
        <div className={cn(
          "flex flex-col",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-4 py-3 rounded-2xl",
            isUser 
              ? "bg-akram-purple text-white rounded-br-none" 
              : "bg-muted dark:bg-muted/70 rounded-bl-none"
          )}>
            {isLoading ? (
              <div className="flex gap-1 items-center h-6">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse delay-300"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{displayContent}</div>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}
