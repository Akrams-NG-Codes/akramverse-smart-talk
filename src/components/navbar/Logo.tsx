
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 bg-akram-purple rounded-lg flex items-center justify-center text-white font-bold text-xl">
        A
      </div>
      <span className="font-bold text-xl">
        <span>Akram</span>
        <span className="text-akram-purple">Verse</span>
      </span>
    </div>
  );
}
