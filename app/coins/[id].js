import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Toast from "react-native-root-toast";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { COIN_API_KEY } from "@env";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AddCoinModal from "../../Components/AddCoinModal";

export default function CoinPage() {
  const [coin, setCoin] = useState([]);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false); // Estado para manejar si es favorito o no

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev); // Cambia el estado de favorito
    setMessage(isFavorite ? "Removed from favorites!" : "Added to favorites!"); // Mensaje de confirmación
    setToastVisible(true); // Muestra el toast
    setTimeout(() => {
      setToastVisible(false); // Oculta el toast después de 3 segundos
    }, 3000);

    //
  };

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COIN_API_KEY,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setCoin(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:" + err);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#52527e" />;
  }
  if (coin.error) {
    return (
      <View>
        <Text>Error loading {id}!!!!</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Toast
          visible={toastVisible}
          opacity={0.9}
          position={100}
          backgroundColor="#82b851"
          shadowColor="#000000"
        >
          {message}
        </Toast>
        <Image source={{ uri: coin.image.small }} style={styles.cryptoImage} />

        <Text style={styles.title}>
          {coin.name}{" "}
          <Text style={{ color: "grey", fontWeight: "100" }}>(USD)</Text>
        </Text>

        {/* Botón para agregar a favoritos */}
        <Pressable style={styles.favorite} onPress={handleFavorite}>
          <FontAwesome
            name={isFavorite ? "star" : "star-o"}
            size={24}
            color={isFavorite ? "#FFD700" : "#bebebe"} // Cambia el color si es favorito
          />
        </Pressable>

        <Text style={styles.title}>
          {coin.name}{" "}
          <Text style={{ color: "grey", fontWeight: "100" }}>(USD)</Text>
        </Text>
        <Pressable style={styles.favorite} onPress={() => handleFavorite()}>
          <FontAwesome name="star-o" size={24} color="#bebebe" />
        </Pressable>

        <Text style={styles.symbol}>{coin.symbol.toUpperCase()}</Text>
        <Text style={styles.coinRank}>
          Market Cap Rank{" "}
          <Text style={styles.coinRankSpan}>{coin.market_cap_rank}</Text>
        </Text>
        <View style={styles.pricesDiv}>
          <Text style={styles.price}>
            Price:{" "}
            <Text
              style={{
                color:
                  coin.market_data.price_change_percentage_24h > 0
                    ? "#3bb650"
                    : "#be4848",
              }}
            >
              ${coin.market_data.current_price.usd}
            </Text>
          </Text>
          <Text style={styles.priceChange}>
            {" "}
            24h Change:
            <Text
              style={{
                color:
                  coin.market_data.price_change_percentage_24h > 0
                    ? "#3bb650"
                    : "#be4848",
              }}
            >
              {" "}
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%{" "}
              <Feather
                name={
                  coin.market_data.price_change_percentage_24h > 0
                    ? "trending-up"
                    : "trending-down"
                }
                size={18}
                color={
                  coin.market_data.price_change_percentage_24h > 0
                    ? "#3bb650"
                    : "#be4848"
                }
              />
            </Text>
          </Text>
          <Text style={styles.priceChange}>
            {" "}
            24h Price Change:
            <Text
              style={{
                color:
                  coin.market_data.price_change_percentage_24h > 0
                    ? "#3bb650"
                    : "#be4848",
              }}
            >
              {" "}
              {coin.market_data.price_change_24h.toFixed(3)}
            </Text>
          </Text>
        </View>
        <Text style={styles.description}>
          {coin.description.en
            ? coin.description.en.split(". ")[0]
            : "No description available."}
        </Text>

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add {coin.name}</Text>
        </Pressable>
        <AddCoinModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          coin={coin}
          setToastVisible={setToastVisible}
          toastVisible={toastVisible}
          infoAdded={setMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    fontFamily: "Inter_18pt-Regular",
    flex: 1,
    backgroundColor: "#0d1421",
    padding: 20,
    paddingTop: 40,
  },
  cryptoImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
    backgroundColor: "#ffffff11",
    borderRadius: 10,
  },
  title: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  favorite: {
    position: "absolute",
    right: 30,
    top: 50,
  },
  coinRank: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-Regular",
    marginBottom: 5,
  },
  coinRankSpan: {
    backgroundColor: "#479e5a",
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: "100%",
    fontWeight: "bold",
  },
  symbol: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#aaa",
    marginBottom: 20,
  },
  pricesDiv: {
    backgroundColor: "#272d4d7e",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  priceChange: {
    fontSize: 18,
    marginBottom: 20,
    color: "#ebebeb",
  },
  description: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 20,
    fontFamily: "Inter_18pt-Regular",
  },
  button: {
    width: 100,
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_18pt-Regular",
    fontSize: 14,
    textAlign: "center",
  },
});
