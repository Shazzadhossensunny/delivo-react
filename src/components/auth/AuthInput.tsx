import { forwardRef, useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/data/mockData";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-14 bg-secondary/60 rounded-xl text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-secondary",
              "transition-all duration-200",
              leftIcon && "pl-12",
              (rightIcon || isPassword) && "pr-12",
              !leftIcon && "pl-4",
              !rightIcon && !isPassword && "pr-4",
              error && "ring-2 ring-destructive focus:ring-destructive",
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";

// Preset input variants
export function EmailInput(props: Omit<InputProps, "type" | "leftIcon">) {
  return (
    <AuthInput
      type="email"
      leftIcon={<Mail className="w-5 h-5" />}
      placeholder="Email address"
      {...props}
    />
  );
}

export function PasswordInput(props: Omit<InputProps, "type" | "leftIcon">) {
  return (
    <AuthInput
      type="password"
      leftIcon={<Lock className="w-5 h-5" />}
      placeholder="Password"
      {...props}
    />
  );
}

export function NameInput(props: Omit<InputProps, "type" | "leftIcon">) {
  return (
    <AuthInput
      type="text"
      leftIcon={<User className="w-5 h-5" />}
      placeholder="Full name"
      {...props}
    />
  );
}

// Phone input with country selector
interface PhoneInputProps extends Omit<InputProps, "leftIcon"> {
  countryCode?: string;
  onCountryChange?: (code: string) => void;
}

export function PhoneInput({
  countryCode = "US",
  onCountryChange,
  ...props
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCountry =
    countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <div className="relative">
      <div className="relative flex">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 h-14 px-3 bg-secondary/60 rounded-l-xl border-r border-border text-foreground"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm text-muted-foreground">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <input
          type="tel"
          className={cn(
            "flex-1 h-14 px-4 bg-secondary/60 rounded-r-xl text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-secondary",
            "transition-all duration-200",
          )}
          placeholder="Phone number"
          {...props}
        />
      </div>

      {/* Country dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-card rounded-xl border border-border shadow-lg z-50 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onCountryChange?.(country.code);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors",
                country.code === countryCode && "bg-muted",
              )}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="text-sm flex-1 text-left">{country.name}</span>
              <span className="text-sm text-muted-foreground">
                {country.dialCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
