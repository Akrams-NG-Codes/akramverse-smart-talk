
import { useState, useRef, useEffect } from "react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

interface ChatHistoryProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
}

export default function ChatHistory({ messages, isLoading }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="mb-4 text-4xl">👋</div>
          <h3 className="text-lg font-medium">Welcome to AkramVerse</h3>
          <p className="text-muted-foreground max-w-md mt-2">
            Start a conversation with our AI assistant. Choose a mode above to get tailored responses.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <ChatMessage
              role="assistant"
              content=""
              timestamp={new Date().toISOString()}
              isLoading={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
