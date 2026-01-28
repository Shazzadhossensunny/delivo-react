import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided initial value
  const getStoredValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update state and localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(e.newValue as unknown as T);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// Hook for checking if onboarding is complete
export function useOnboardingStatus() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage(
    "delivo_onboarding_complete",
    false,
  );
  return { hasSeenOnboarding, setHasSeenOnboarding };
}

// Hook for managing favorites
export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "delivo_favorites",
    [],
  );

  const toggleFavorite = useCallback(
    (itemId: string) => {
      setFavorites((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    },
    [setFavorites],
  );

  const isFavorite = useCallback(
    (itemId: string) => {
      return favorites.includes(itemId);
    },
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
}

// Hook for managing recent searches
export function useRecentSearches() {
  const [searches, setSearches] = useLocalStorage<string[]>(
    "delivo_recent_searches",
    [],
  );

  const addSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      setSearches((prev) => {
        const filtered = prev.filter(
          (s) => s.toLowerCase() !== trimmed.toLowerCase(),
        );
        return [trimmed, ...filtered].slice(0, 10); // Keep last 10
      });
    },
    [setSearches],
  );

  const clearSearches = useCallback(() => {
    setSearches([]);
  }, [setSearches]);

  const removeSearch = useCallback(
    (query: string) => {
      setSearches((prev) => prev.filter((s) => s !== query));
    },
    [setSearches],
  );

  return { searches, addSearch, clearSearches, removeSearch };
}

// Hook for cart management
export interface CartItem {
  itemId: string;
  quantity: number;
  size?: string;
  addons?: string[];
}

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("delivo_cart", []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (i) =>
            i.itemId === item.itemId &&
            i.size === item.size &&
            JSON.stringify(i.addons?.sort()) ===
              JSON.stringify(item.addons?.sort()),
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += item.quantity;
          return updated;
        }

        return [...prev, item];
      });
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (index: number) => {
      setCart((prev) => prev.filter((_, i) => i !== index));
    },
    [setCart],
  );

  const updateQuantity = useCallback(
    (index: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(index);
        return;
      }

      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = quantity;
        return updated;
      });
    },
    [setCart, removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
  };
}
