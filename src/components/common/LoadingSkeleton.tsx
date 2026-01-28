import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Splash screen skeleton
export function SplashSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center animate-pulse">
        <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4" />
        <div className="h-8 w-32 bg-muted rounded mx-auto" />
      </div>
    </div>
  );
}

// Food card skeleton
export function FoodCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-[160px] shrink-0", className)}>
      <Skeleton className="w-full aspect-square rounded-card mb-2" />
      <Skeleton className="h-4 w-3/4 mb-1" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

// Hot deal card skeleton
export function HotDealCardSkeleton() {
  return (
    <div className="flex gap-3 p-3 bg-card rounded-card">
      <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

// Home page skeleton
export function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header skeleton */}
      <div className="bg-primary p-6 pb-8 rounded-b-[32px]">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
          <div className="flex-1 mx-4">
            <Skeleton className="h-3 w-20 bg-white/20 mb-1" />
            <Skeleton className="h-4 w-32 bg-white/20" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
        </div>
        <Skeleton className="h-6 w-3/4 bg-white/20 mb-4" />
        <Skeleton className="h-12 w-full rounded-xl bg-white/20" />
      </div>

      {/* Categories skeleton */}
      <div className="p-4">
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-20 h-10 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Super deals skeleton */}
      <div className="p-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Hot deals skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-24 mb-4" />
        {[1, 2, 3].map((i) => (
          <HotDealCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Menu detail skeleton
export function MenuDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full rounded-button" />
      </div>
    </div>
  );
}

// Auth form skeleton
export function AuthFormSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
      <Skeleton className="h-14 w-full rounded-xl" />
      <Skeleton className="h-14 w-full rounded-button" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="w-14 h-14 rounded-xl" />
        <Skeleton className="w-14 h-14 rounded-xl" />
        <Skeleton className="w-14 h-14 rounded-xl" />
      </div>
    </div>
  );
}
