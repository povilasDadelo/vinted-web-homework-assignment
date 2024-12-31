import { createContext, useState, ReactNode, useEffect } from 'react';

type FavoritesContextValue = {
  favorites: Set<number>;
  toggleFavorite: (photoId: number) => void;
  isFavorite: (photoId: number) => boolean;
}

type FavoritesProviderProps = {
  children: ReactNode;
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('my-favorite-photos');

    if (saved) {
      try {
        const parsed: number[] = JSON.parse(saved);

        return new Set(parsed);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);

        return new Set();
      }
    }

    return new Set();
  });

  useEffect(() => {
    const arr = Array.from(favorites);

    localStorage.setItem('my-favorite-photos', JSON.stringify(arr));
  }, [favorites]);

  const isFavorite = (photoId: number) => favorites.has(photoId);

  const toggleFavorite = (photoId: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);

      if (updated.has(photoId)) {
        updated.delete(photoId);
      } else {
        updated.add(photoId);
      }

      return updated;
    });
  };

  const value: FavoritesContextValue = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
