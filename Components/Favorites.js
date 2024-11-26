import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { useRouter } from "expo-router";

const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users";

export default function Favorites() {
  const { user } = useContext(UserSessionContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${API_URL}/${user.id}`);
        const userData = await response.json();
        if (userData.favorites) {
          setFavorites(userData.favorites);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchFavorites();
    }
  }, [user]);

  const handleLink = (coinSymbol) => {
    router.push(`/coins/${coinSymbol}`);
  };

  const renderFavoriteItem = ({ coinName, coinSymbol, coinImage }) => (
    <Pressable
      key={coinSymbol}
      style={styles.cryptoItem}
      onPress={() => handleLink(coinName.toLowerCase())}
    >
      <Image source={{ uri: coinImage }} style={styles.cryptoImage} />
      <Text style={styles.cryptoName}>
        {coinName}{" "}
        <Text style={styles.cryptoSymbol}>({coinSymbol.toUpperCase()})</Text>
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Coins</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00AEEF" />
      ) : favorites.length > 0 ? (
        <View style={styles.listContainer}>
          {favorites.map((coin) => renderFavoriteItem(coin))}
        </View>
      ) : (
        <Text style={styles.noFavoritesText}>No favorites available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E5E7EB",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 16,
  },
  cryptoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#273549",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cryptoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cryptoName: {
    fontSize: 16,
    color: "#F1F5F9",
    fontWeight: "600",
  },
  cryptoSymbol: {
    fontSize: 14,
    color: "#94A3B8",
  },
  noFavoritesText: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 20,
  },
});
