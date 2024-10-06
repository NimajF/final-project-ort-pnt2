import { View, Text, StyleSheet } from "react-native";

export default function FavoriteList({ favorites }) {
  return (
    <View>
      <Text style={styles.title}>Your Favorites</Text>
      {favorites.map((favorite, index) => (
        <Text key={index} style={styles.favorite}>
          {favorite}
        </Text>
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
});
