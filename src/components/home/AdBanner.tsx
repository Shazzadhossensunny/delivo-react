import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <Link
      to="/offers"
      className={cn(
        "block mx-5 rounded-2xl overflow-hidden relative group",
        className,
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-orange-400" />

      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full bg-white/5" />

      {/* Content */}
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <div className="max-w-[60%]">
            <p className="text-white/80 text-xs font-medium mb-1">
              Limited Time Offer
            </p>
            <h3 className="text-white text-lg font-bold mb-1">Get 50% OFF</h3>
            <p className="text-white/80 text-xs">
              On your first 3 orders. Use code: DELIVO50
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// Section header with "See All" link
interface SectionHeaderProps {
  title: string;
  emoji?: string;
  seeAllLink?: string;
  className?: string;
}

export function SectionHeader({
  title,
  emoji,
  seeAllLink,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between px-5 mb-3", className)}
    >
      <h2 className="text-lg font-bold text-foreground">
        {title} {emoji && <span>{emoji}</span>}
      </h2>
      {seeAllLink && (
        <Link
          to={seeAllLink}
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          See All
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
