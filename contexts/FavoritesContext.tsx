import { Quote } from '@/data/quotes';
import { createContext, ReactNode, useContext, useState } from 'react';

type FavoritesContextType = {
  favorites: Quote[];
  addFavorite: (quote: Quote) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: async () => {},
  removeFavorite: async () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  const addFavorite = async (quote: Quote) => {
    setFavorites(prev => [...prev, quote]);
  };

  const removeFavorite = async (id: string) => {
    setFavorites(prev => prev.filter(q => q.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(q => q.id === id);
  };

  return (
    <FavoritesContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
