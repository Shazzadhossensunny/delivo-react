import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  error = false,
  autoFocus = true,
}: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Update focus when value changes
  useEffect(() => {
    const nextEmptyIndex = value.length < length ? value.length : length - 1;
    setActiveIndex(nextEmptyIndex);
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;

    // Only allow single digit
    const sanitized = digit.replace(/\D/g, "").slice(-1);

    if (sanitized) {
      const newValue =
        value.slice(0, index) + sanitized + value.slice(index + 1);
      onChange(newValue);

      // Move to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();

      if (value[index]) {
        // Clear current digit
        const newValue = value.slice(0, index) + value.slice(index + 1);
        onChange(newValue);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newValue = value.slice(0, index - 1) + value.slice(index);
        onChange(newValue);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, length);

    if (digits) {
      onChange(digits);
      const focusIndex = Math.min(digits.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
    // Select the input content
    inputRefs.current[index]?.select();
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={cn(
            "otp-input",
            error && "border-destructive focus:border-destructive",
            activeIndex === index && !error && "border-primary bg-secondary",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        />
      ))}
    </div>
  );
}

// Resend timer component
interface ResendTimerProps {
  seconds: number;
  onResend: () => void;
  className?: string;
}

export function ResendTimer({
  seconds,
  onResend,
  className,
}: ResendTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;
    onResend();
    setTimeLeft(seconds);
    setCanResend(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("text-center", className)}>
      {canResend ? (
        <button
          onClick={handleResend}
          className="text-primary font-semibold hover:underline transition-all"
        >
          Resend Code
        </button>
      ) : (
        <p className="text-muted-foreground">
          Resend code in{" "}
          <span className="text-primary font-semibold">
            {formatTime(timeLeft)}
          </span>
        </p>
      )}
    </div>
  );
}
