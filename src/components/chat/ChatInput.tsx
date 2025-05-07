
import { useState, FormEvent } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };
  
  const toggleRecording = () => {
    // This would be where you'd implement the actual voice recognition
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulating voice recognition for now
      // In a real implementation, you'd use the Web Speech API
      setTimeout(() => {
        setMessage(prev => prev + " Voice input simulation");
        setIsRecording(false);
      }, 2000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-background border rounded-lg p-2 shadow-sm">
      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleRecording}
          className={isRecording ? "text-destructive" : ""}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() || isLoading}
          className="rounded-full"
        >
          <Send size={18} className={message.trim() ? "text-white" : ""} />
        </Button>
      </div>
    </form>
  );
}
