import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DelivoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const DelivoButton = forwardRef<HTMLButtonElement, DelivoButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:brightness-110 focus:ring-primary rounded-button",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary rounded-button",
      outline:
        "border-2 border-muted-foreground/30 text-foreground hover:border-primary hover:text-primary focus:ring-primary rounded-button",
      ghost: "text-foreground hover:bg-muted focus:ring-muted rounded-lg",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-2",
      md: "h-12 px-6 text-base gap-2",
      lg: "h-14 px-8 text-lg gap-3",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

DelivoButton.displayName = "DelivoButton";
