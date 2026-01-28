import { Heart, Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  type FoodItem,
  formatPrice,
  getDiscountPercentage,
} from "@/data/mockData";
import { useFavorites } from "@/hooks/useLocalStorage";
import { useState } from "react";

interface HotDealCardProps {
  item: FoodItem;
  className?: string;
}

export function HotDealCard({ item, className }: HotDealCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <Link
      to={`/menu/${item.id}`}
      className={cn(
        "flex gap-3 p-3 bg-card rounded-card group hover:bg-muted/50 transition-colors",
        className,
      )}
    >
      {/* Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-shimmer" />
        )}

        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110",
            !imageLoaded && "opacity-0",
          )}
        />

        {/* Discount badge */}
        {item.originalPrice && (
          <span className="absolute top-1 left-1 bg-destructive text-destructive-foreground text-2xs font-bold px-1.5 py-0.5 rounded">
            -{getDiscountPercentage(item.originalPrice, item.price)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <button
              onClick={handleFavoriteClick}
              className="shrink-0 p-1 -mr-1"
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-colors",
                  favorite
                    ? "fill-destructive text-destructive"
                    : "text-muted-foreground hover:text-destructive",
                )}
              />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {item.restaurant}
          </p>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{item.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{item.distance}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          {item.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
