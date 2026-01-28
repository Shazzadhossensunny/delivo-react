import { cn } from "@/lib/utils";

interface HomeIndicatorProps {
  variant?: "dark" | "light";
  className?: string;
}

export function HomeIndicator({
  variant = "light",
  className,
}: HomeIndicatorProps) {
  return (
    <div className={cn("flex justify-center py-2 safe-bottom", className)}>
      <div
        className={cn(
          "home-indicator",
          variant === "dark" ? "bg-background" : "bg-foreground",
        )}
      />
    </div>
  );
}
