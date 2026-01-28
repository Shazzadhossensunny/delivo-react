import { useState, useCallback, type TouchEvent } from "react";

interface SwipeState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  swiping: boolean;
}

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Minimum distance to trigger swipe
}

export function useSwipe(options: UseSwipeOptions): SwipeHandlers {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    swiping: false,
  });

  const onTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      swiping: true,
    });
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!swipeState.swiping) return;

      const touch = e.touches[0];
      setSwipeState((prev) => ({
        ...prev,
        endX: touch.clientX,
        endY: touch.clientY,
      }));
    },
    [swipeState.swiping],
  );

  const onTouchEnd = useCallback(() => {
    if (!swipeState.swiping) return;

    const deltaX = swipeState.endX - swipeState.startX;
    const deltaY = swipeState.endY - swipeState.startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (absDeltaX > threshold) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDeltaY > threshold) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }

    setSwipeState((prev) => ({ ...prev, swiping: false }));
  }, [
    swipeState,
    threshold,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  ]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

// Hook for tracking swipe progress (useful for animations)
export function useSwipeProgress(
  options: UseSwipeOptions & { maxDistance?: number },
) {
  const { maxDistance = 200, ...swipeOptions } = options;

  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const [startX, setStartX] = useState(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setProgress(0);
    setDirection(null);
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      const currentX = e.touches[0].clientX;
      const delta = currentX - startX;
      const normalizedProgress = Math.min(Math.abs(delta) / maxDistance, 1);

      setProgress(normalizedProgress);
      setDirection(delta > 0 ? "right" : "left");
    },
    [startX, maxDistance],
  );

  const onTouchEnd = useCallback(() => {
    const threshold = 0.3; // 30% of max distance

    if (progress > threshold) {
      if (direction === "left") {
        swipeOptions.onSwipeLeft?.();
      } else if (direction === "right") {
        swipeOptions.onSwipeRight?.();
      }
    }

    setProgress(0);
    setDirection(null);
  }, [progress, direction, swipeOptions]);

  return {
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
    progress,
    direction,
  };
}
