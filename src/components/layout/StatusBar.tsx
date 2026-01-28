import { cn } from "@/lib/utils";

interface StatusBarProps {
  variant?: "dark" | "light" | "transparent";
  className?: string;
}

export function StatusBar({ variant = "dark", className }: StatusBarProps) {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={cn(
        "status-bar flex items-center justify-between px-6 py-3",
        variant === "dark" && "bg-background text-foreground",
        variant === "light" && "bg-foreground text-background",
        variant === "transparent" && "bg-transparent text-foreground",
        className,
      )}
    >
      <span className="text-sm font-semibold">{currentTime}</span>

      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex items-end gap-0.5 mr-1">
          <div className="w-1 h-1 bg-current rounded-sm" />
          <div className="w-1 h-2 bg-current rounded-sm" />
          <div className="w-1 h-3 bg-current rounded-sm" />
          <div className="w-1 h-3.5 bg-current rounded-sm" />
        </div>

        {/* WiFi icon */}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.1l1.4 1.4c1.9-1.9 5-1.9 6.9 0l1.4-1.4c-2.7-2.7-7-2.7-9.7 0zm-2.8-2.8l1.4 1.4c3.5-3.5 9.2-3.5 12.7 0l1.4-1.4c-4.3-4.3-11.2-4.3-15.5 0zM1.4 10.3l1.4 1.4c5.1-5.1 13.4-5.1 18.5 0l1.4-1.4c-5.9-5.9-15.4-5.9-21.3 0z" />
        </svg>

        {/* Battery */}
        <div className="flex items-center ml-1">
          <div className="w-6 h-3 border border-current rounded-sm relative">
            <div
              className="absolute inset-0.5 bg-current rounded-xs"
              style={{ width: "80%" }}
            />
          </div>
          <div className="w-0.5 h-1.5 bg-current rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}
