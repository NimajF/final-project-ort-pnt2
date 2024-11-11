import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users"; // Ajusta según tu API

export default function FavoriteList({ userId, favorites, onFavoriteAdd }) {
  const handleAddFavorite = async (coin) => {
    try {
      // Primero obtenemos los datos del usuario actual
      const responseUser = await fetch(`${API_URL}${users / id}`);
      const userData = await responseUser.json();

      // Asegúrate de que el usuario tenga un campo 'favorites' y lo actualizamos
      const updatedFavorites = [
        ...userData.favorites,
        {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image.small,
          price: coin.market_data.current_price.usd, // Si deseas almacenar el precio también
        },
      ];

      // Ahora, realizamos un PATCH para actualizar el array de favoritos del usuario
      const responseUpdate = await fetch(`${API_URL}${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites: updatedFavorites, // Actualizamos el campo 'favorites'
        }),
      });

      if (!responseUpdate.ok) {
        throw new Error("Error al actualizar favoritos");
      }

      const updatedUserData = await responseUpdate.json();
      Alert.alert(
        "Favorito agregado",
        `Se agregó ${coin.name} (${coin.symbol}) a tus favoritos.`
      );
      onFavoriteAdd(updatedUserData.favorites); // Llama a la función para actualizar la lista de favoritos en el estado
    } catch (error) {
      console.error("Error agregando favorito:", error);
      Alert.alert("Error", "No se pudo agregar el favorito.");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Your Favorites</Text>
      {favorites.map((coin, index) => (
        <View key={index} style={styles.favoriteContainer}>
          <Text style={styles.favorite}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </Text>
          <TouchableOpacity
            onPress={() => handleAddFavorite(coin)} // Pasar la moneda completa al manejar el favorito
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  favorite: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  favoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
