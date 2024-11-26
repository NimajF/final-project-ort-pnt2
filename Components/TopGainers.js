import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import InfoTable from "./InfoTable";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { sortData } from "../utils/handlers";
import { endpoints } from "../consts/endpoints";
import SelectForApi from "./SelectForApi";
import { COIN_API_KEY } from "@env";

export default function TopGainers() {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState(0);
  const [sortOption, setSortOption] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleLink = (id) => {
    router.push({
      pathname: "/coins/[id]",
      params: { id: id },
    });
  };

  const handleSort = (option) => {
    const newDirection =
      sortOption === option && sortDirection === "asc" ? "desc" : "asc";

    setSortOption(option);
    setSortDirection(newDirection);

    const sortedRes = sortData(data, option, newDirection);
    setData(sortedRes);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COIN_API_KEY,
      },
    };
    fetch(endpoints[endpoint], options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  }, [endpoint]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": COIN_API_KEY,
        },
      };
      try {
        const response = await fetch(endpoints[endpoint], options);
        const json = await response.json();
        if (endpoint === "1") {
          const sortedJson = json.sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          );
          setData(sortedJson);
        } else {
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Coinfolio</Text>
      </View>
      {/* <SelectForApi handleOption={handleOption} /> */}
      <View style={styles.bottomSection}>
        <InfoTable handleSort={handleSort} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    fontFamily: "Inter_18pt-Regular",
  },
  topSection: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#1E293B",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 30,
  },
  title: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#E5E7EB",
    paddingVertical: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#334155",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1E293B",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  cryptoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#273549", // Azul grisáceo más claro para destacar las tarjetas
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#334155", // Línea de separación sutil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cryptoImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  cryptoNameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cryptoName: {
    fontSize: 14,
    color: "#F1F5F9", // Gris muy claro para el texto principal
    fontFamily: "Inter_18pt-Regular",
  },
  rankColumn: {
    width: "10%",
    color: "#93C5FD", // Azul suave y relajado para los rankings
    textAlign: "center",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "500",
  },
  nameColumn: {
    width: "30%",
    flexDirection: "row",
    alignItems: "flex-start",
    fontFamily: "Inter_18pt-Regular",
    color: "#E5E7EB",
  },
  priceColumn: {
    width: "20%",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
    color: "#FBBF24", // Dorado suave para precios, resalta sin ser demasiado llamativo
  },
  changeColumn: {
    width: "15%",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
    color: "#EF4444", // Rojo apagado para cambios negativos
  },
  marketCapColumn: {
    width: "25%",
    fontSize: 12,
    color: "#94A3B8", // Azul grisáceo claro para market cap
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
  },
  positiveChange: {
    color: "#10B981", // Verde profesional para cambios positivos
    fontWeight: "bold",
  },
});
