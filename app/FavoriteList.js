import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserSessionContext } from "../contexts/UserSessionContext";

const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users";
export default function FavoriteList() {
  const { user } = useContext(UserSessionContext);

  return (
    <View>
      <Text style={styles.title}>Your Favorites</Text>
      {user?.favorites?.map((coin, index) => (
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
