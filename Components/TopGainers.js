import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import InfoTable from "./InfoTable";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import SelectForApi from "./SelectForApi";
import { COIN_API_KEY } from "@env";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TopGainers() {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState("");
  const handleLink = (id) => {
    router.push({
      pathname: "/coins/[id]",
      params: { id: id },
    });
  };

  const handleOption = (endpoint) => {
    setEndpoint(endpoint);
  };

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=10&price_change_percentage=1h%2C24h%2C7d";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COIN_API_KEY,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  }, []);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COIN_API_KEY,
      },
    };
    fetch(endpoint, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  }, [endpoint]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best of Crypto 🔥</Text>
      <SelectForApi option={handleOption} />
      <InfoTable />
      {data && data.length > 0
        ? data.map((crypto, index) => (
            <Pressable key={index} onPress={() => handleLink(crypto.id)}>
              <View style={styles.cryptoItem}>
                <Text style={styles.rankColumn}>{index + 1}</Text>
                <View style={styles.nameColumn}>
                  <Image
                    source={{ uri: crypto.image }}
                    style={styles.cryptoImage}
                  />
                  <Text style={styles.cryptoName}>
                    {crypto.name}{" "}
                    <Text style={{ color: "grey", marginLeft: 2 }}>
                      {crypto.symbol.toUpperCase()}
                    </Text>
                  </Text>
                </View>
                <Text
                  style={[
                    styles.priceColumn,
                    {
                      color:
                        crypto.price_change_percentage_24h_in_currency > 0
                          ? "#3bb650"
                          : "#be4848",
                    },
                  ]}
                >
                  ${crypto.current_price.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.changeColumn,
                    {
                      color:
                        crypto.price_change_percentage_24h_in_currency > 0
                          ? "#3bb650"
                          : "#be4848",
                    },
                  ]}
                >
                  {crypto.price_change_percentage_24h_in_currency.toFixed(2)}%
                </Text>
                <Text style={styles.marketCapColumn}>
                  ${crypto.market_cap.toLocaleString()}
                </Text>
              </View>
            </Pressable>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#101929",
    width: "100%",
    fontFamily: "Inter_18pt-Regular",
  },
  title: {
    fontFamily: "Inter_18pt-Regular",
    width: 220,
    borderRadius: 10,
    fontSize: 24,
    textAlign: "start",
    marginBottom: 20,
    color: "#FFF",
    backgroundColor: "#524083",
    border: "1px solid #2a1d50",
    padding: 10,
  },
  cryptoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121b2c",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cryptoImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  cryptoNameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cryptoName: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Inter_18pt-Regular",
  },
  cryptoSymbol: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "normal",
    color: "#888888", // Color gris para el símbolo
    marginLeft: 1, // Añadir espacio entre el nombre y el símbolo
  },
  crypto24Change: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "normal",
    marginLeft: 10, // Añadir espacio entre el nombre y el símbolo
  },
  cryptoPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    fontFamily: "Inter_18pt-Regular",
  },
  headerText: {
    color: "#aaa",
    fontWeight: "bold",
    fontFamily: "Inter_18pt-Regular",
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3c8b88",
    fontFamily: "Inter_18pt-Regular",
  },
  rankColumn: {
    width: "10%",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter_18pt-Regular",
  },
  nameColumn: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Inter_18pt-Regular",
  },
  cryptoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    fontFamily: "Inter_18pt-Regular",
  },
  cryptoName: {
    color: "#fff",
    fontFamily: "Inter_18pt-Regular",
  },
  priceColumn: {
    width: "20%",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
  },
  changeColumn: {
    width: "15%",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
  },
  marketCapColumn: {
    width: "25%",
    color: "#fff",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "lighter",
  },
});
