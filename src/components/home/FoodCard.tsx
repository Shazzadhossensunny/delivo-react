import { Heart, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  type FoodItem,
  formatPrice,
  getDiscountPercentage,
} from "@/data/mockData";
import { useFavorites } from "@/hooks/useLocalStorage";
import { useState } from "react";

interface FoodCardProps {
  item: FoodItem;
  className?: string;
}

export function FoodCard({ item, className }: FoodCardProps) {
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
      className={cn("block w-[160px] shrink-0 group", className)}
    >
      {/* Image container */}
      <div className="relative aspect-square rounded-card overflow-hidden mb-2">
        {/* Skeleton while loading */}
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
          <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-2xs font-bold px-2 py-1 rounded-full">
            -{getDiscountPercentage(item.originalPrice, item.price)}%
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              favorite
                ? "fill-destructive text-destructive"
                : "text-foreground",
            )}
          />
        </button>

        {/* Rating badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-2xs font-medium">{item.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {item.restaurant}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
