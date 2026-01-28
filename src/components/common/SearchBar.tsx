import { forwardRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SearchBarProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  showFilter?: boolean;
  variant?: "default" | "header";
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      onSearch,
      onFilterClick,
      showFilter = true,
      variant = "default",
      placeholder = "Search your favourite food...",
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onSearch?.(e.target.value);
    };

    const handleClear = () => {
      setValue("");
      onSearch?.("");
    };

    const handleFocus = () => {
      // Navigate to search page if not already there
      if (variant === "header") {
        navigate("/search");
      }
    };

    return (
      <div
        className={cn(
          "relative flex items-center gap-2",
          variant === "header" && "w-full",
          className,
        )}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={cn(
              "w-full h-12 pl-12 pr-10 bg-secondary/60 rounded-xl text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "transition-all duration-200",
              variant === "header" &&
                "bg-white/10 text-white placeholder:text-white/60",
            )}
            {...props}
          />
          {value && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {showFilter && (
          <button
            onClick={onFilterClick || (() => navigate("/filter"))}
            className={cn(
              "h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-200",
              variant === "header"
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-primary hover:brightness-110 text-primary-foreground",
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
