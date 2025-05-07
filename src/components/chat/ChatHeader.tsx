
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export type ChatMode = "tutor" | "writer" | "developer" | "support";

interface ChatHeaderProps {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const modes = {
  tutor: {
    label: "Tutor Mode",
    description: "For academic-related questions"
  },
  writer: {
    label: "Content Writer Mode",
    description: "Assists with writing tasks"
  },
  developer: {
    label: "Dev Assistant Mode", 
    description: "Helps debug and explain code"
  },
  support: {
    label: "Support Mode",
    description: "Handles customer service inquiries"
  }
};

export default function ChatHeader({ mode, onModeChange }: ChatHeaderProps) {
  return (
    <div className="bg-background border-b p-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">
        {modes[mode].label}
      </h2>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="text-sm">
            Change Mode
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          {Object.entries(modes).map(([key, { label, description }]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => onModeChange(key as ChatMode)}
              className="flex flex-col items-start py-2"
            >
              <span className="font-medium">{label}</span>
              <span className="text-xs text-muted-foreground mt-1">{description}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
