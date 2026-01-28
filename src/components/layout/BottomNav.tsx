import { Link, useLocation } from "react-router-dom";
import { Home, Heart, ShoppingCart, Receipt, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useLocalStorage";
import { HomeIndicator } from "./HomeIndicator";

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/favorites", icon: Heart, label: "Favorites" },
  { path: "/cart", icon: ShoppingCart, label: "Cart", showBadge: true },
  { path: "/orders", icon: Receipt, label: "Orders" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <nav className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label, showBadge }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 relative",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    isActive && "scale-110",
                  )}
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 1.5 : 2}
                />

                {/* Cart badge */}
                {showBadge && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-2xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>

              <span
                className={cn(
                  "text-2xs font-medium transition-all duration-200",
                  isActive && "font-semibold",
                )}
              >
                {label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <HomeIndicator />
    </div>
  );
}
