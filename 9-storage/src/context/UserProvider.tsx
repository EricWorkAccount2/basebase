import { UserContext } from '@/context';
import { FAVORITES_KEY, USERNAME_KEY, type ImageCell } from '@/core';
import { useLocalStorage } from '@/hooks';
import { type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string>(USERNAME_KEY, 'User');
  const [favoritesStorage, setFavoritesStorage] = useLocalStorage<[number, ImageCell][]>(FAVORITES_KEY, []);

  const favorites = new Map(favoritesStorage);

  const toggleFavorite = (item: ImageCell) => {
    const map = new Map(favorites);

    if (map.has(item.id)) {
      map.delete(item.id);
    } else {
      map.set(item.id, item);
    }

    setFavoritesStorage(Array.from(map.entries()));
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        favorites,
        setUserName,
        toggleFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
