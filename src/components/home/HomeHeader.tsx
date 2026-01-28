import { MapPin, Bell, ChevronDown } from "lucide-react";
import { SearchBar } from "@/components/common/SearchBar";
import { cn } from "@/lib/utils";

interface HomeHeaderProps {
  userName?: string;
  userAvatar?: string;
  location?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onLocationClick?: () => void;
  onAvatarClick?: () => void;
}

export function HomeHeader({
  userName = "John",
  userAvatar,
  location = "123 Main Street, NYC",
  notificationCount = 3,
  onNotificationClick,
  onLocationClick,
  onAvatarClick,
}: HomeHeaderProps) {
  return (
    <div className="bg-primary rounded-b-[32px] pt-safe-top">
      {/* Status bar area */}
      <div className="h-11" />

      {/* Header content */}
      <div className="px-5 pb-6">
        {/* Top row: Avatar, Location, Notifications */}
        <div className="flex items-center justify-between mb-5">
          {/* Avatar */}
          <button
            onClick={onAvatarClick}
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 transition-transform hover:scale-105"
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/20 flex items-center justify-center text-white font-semibold">
                {userName[0]}
              </div>
            )}
          </button>

          {/* Location */}
          <button
            onClick={onLocationClick}
            className="flex-1 mx-4 text-left group"
          >
            <p className="text-xs text-white/70 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Deliver to
            </p>
            <p className="text-sm text-white font-medium flex items-center gap-1 group-hover:underline">
              {location.length > 25 ? `${location.slice(0, 25)}...` : location}
              <ChevronDown className="w-4 h-4" />
            </p>
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationClick}
            className="relative w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Bell className="w-5 h-5 text-white" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white text-primary text-2xs font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Greeting */}
        <div className="mb-5">
          <h1 className="text-xl font-bold text-white">
            Hey {userName}!{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-white/80 text-sm mt-1">
            What would you prefer to eat today?
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar variant="header" />
      </div>
    </div>
  );
}
