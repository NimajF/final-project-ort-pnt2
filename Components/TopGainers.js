import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import InfoTable from "./InfoTable";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import coinsSortAndFilter from "../utils/coinsSortAndFilter";
import { endpoints } from "../consts/endpoints";
import SelectForApi from "./SelectForApi";
import { COIN_API_KEY } from "@env";

export default function TopGainers() {
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState(0);

  const handleLink = (id) => {
    router.push({
      pathname: "/coins/[id]",
      params: { id: id },
    });
  };

  const handleOption = (newEndpoint) => {
    setEndpoint(newEndpoint);
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
  }, []);

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
        <Text style={styles.title}>Trending Market</Text>
      </View>
      <SelectForApi handleOption={handleOption} />
      <View style={styles.bottomSection}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2E47", // Fondo azul oscuro
    fontFamily: "Inter_18pt-Regular",
  },
  topSection: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#1A2E47", // Fondo azul oscuro
  },
  title: {
    fontFamily: "Inter_18pt-Regular",
    fontSize: 35,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
    paddingVertical: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  bottomSection: {
    flex: 1,
    width: "100%", // Ocupa todo el ancho de la pantalla
    backgroundColor: "#FFFFFF", // Fondo blanco para la tabla
    borderTopLeftRadius: 15, // Borde redondeado en la esquina superior izquierda
    borderTopRightRadius: 15, // Borde redondeado en la esquina superior derecha
    paddingTop: 20, // Espaciado solo en la parte superior para el texto del título
    overflow: "hidden", // Evita que elementos internos se salgan del borde redondeado
  },
  cryptoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Fondo blanco para cada item de la criptomoneda
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", // Línea de separación entre elementos
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cryptoImage: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  cryptoNameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cryptoName: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "Inter_18pt-Regular",
  },
  rankColumn: {
    width: "10%",
    color: "#000000",
    textAlign: "center",
    fontFamily: "Inter_18pt-Regular",
  },
  nameColumn: {
    width: "30%",
    flexDirection: "row",
    alignItems: "flex-start",
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
    fontSize: 12,
    color: "#000000",
    textAlign: "right",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "lighter",
  },
});
