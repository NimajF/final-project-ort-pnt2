import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserSessionContext } from "./UserSessionContext"; // Importamos el contexto de usuario

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(UserSessionContext); // Obtenemos el usuario autenticado
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Cargar los favoritos del usuario si está autenticado
    const loadFavorites = async () => {
      if (user) {
        const storedFavorites = await AsyncStorage.getItem(
          `favorites-${user.id}`
        );
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }
    };
    loadFavorites();
  }, [user]); // Se ejecuta cada vez que el usuario cambie (inicie sesión)

  const addFavorite = async (favorite) => {
    if (!user) {
      alert("Debes estar logueado para agregar favoritos");
      return;
    }

    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      `favorites-${user.id}`,
      JSON.stringify(updatedFavorites)
    );
  };

  const removeFavorite = async (favoriteId) => {
    if (!user) {
      alert("Debes estar logueado para eliminar favoritos");
      return;
    }

    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem(
      `favorites-${user.id}`,
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (favoriteId) => {
    return favorites.some((fav) => fav.id === favoriteId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
