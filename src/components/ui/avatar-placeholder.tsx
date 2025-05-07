
import { cn } from "@/lib/utils";

interface AvatarPlaceholderProps {
  initials: string;
  className?: string;
}

export function AvatarPlaceholder({ initials, className }: AvatarPlaceholderProps) {
  return (
    <div 
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-akram-purple text-sm font-medium text-primary-foreground",
        className
      )}
    >
      {initials}
    </div>
  );
}
