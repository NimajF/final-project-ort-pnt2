import { useState } from "react";
import { View } from "react-native";
import SelectForApi from "./SelectForApi";
import FavoriteList from "./FavoriteList";

export default function MainComponent() {
  const [favorites, setFavorites] = useState([]);

  // Función para agregar un favorito
  const addFavorite = (endpoint) => {
    setFavorites((prevFavorites) => [...prevFavorites, endpoint]);
  };

  return (
    <View>
      <SelectForApi addFavorite={addFavorite} />
      <FavoriteList favorites={favorites} />
    </View>
  );
}
