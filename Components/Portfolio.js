import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { UserPortfolioContext } from "../contexts/UserPortfolioContext";
import { calculateCoinPnL } from "../utils/handlers";

export default function PortfolioTable() {
  const { portfolio, prices, pnl } = useContext(UserPortfolioContext);

  const renderRow = ({ item: coin }) => {
    const pnlData =
      prices && prices[coin.coinId]?.usd
        ? calculateCoinPnL(
            coin.totalAmount,
            prices[coin.coinId]?.usd,
            coin.totalCoinInversion
          )
        : { pnl: "0.000", percentage: "0.00" };

    return (
      <View style={[styles.row]}>
        <TouchableOpacity
          style={styles.cell}
          onPress={() => console.log(`Navigate to ${coin.coinId}`)}
        >
          <Image
            source={{ uri: coin.coinImage }}
            style={styles.image}
            onError={() =>
              console.log(`Error loading image for ${coin.coinId}`)
            }
          />
          <Text style={styles.text}>{coin.symbol.toUpperCase()}</Text>
        </TouchableOpacity>
        <Text style={[styles.cell, styles.textRight]}>{coin.totalAmount}</Text>
        <Text style={[styles.cell, styles.textRight]}>
          {prices?.[coin.coinId]?.usd ? `$${prices[coin.coinId].usd}` : "N/A"}
        </Text>
        <Text
          style={[
            styles.cell,
            styles.textRight,
            pnlData.pnl < 0 ? styles.negative : styles.positive,
          ]}
        >
          {pnlData.pnl !== "0.000" ? `$ ${pnlData.pnl}` : "N/A"}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerCell, styles.textLeft]}>Currency</Text>
        <Text style={[styles.headerCell, styles.textRight]}>Amount</Text>
        <Text style={[styles.headerCell, styles.textRight]}>Price</Text>
        <Text style={[styles.headerCell, styles.textRight]}>PnL</Text>
      </View>

      {portfolio?.coins.length > 0 ? (
        <FlatList
          data={portfolio?.coins}
          keyExtractor={(item) => item.coinId}
          renderItem={renderRow}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              No coins available in your portfolio
            </Text>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            No coins available in your portfolio
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a202c",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: "Inter_18pt-Regular",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#2d3748",
    paddingVertical: 10,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Inter_18pt-Regular",
  },
  headerCell: {
    flex: 1,
    color: "#cbd5e0",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Inter_18pt-Regular",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#4a5568",
    fontFamily: "Inter_18pt-Regular",
  },
  rowPositive: {
    backgroundColor: "#2a4365",
  },
  rowNegative: {
    backgroundColor: "#742a2a",
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Inter_18pt-Regular",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  text: {
    color: "#e2e8f0",
    fontSize: 12,
  },
  positive: {
    color: "#48bb78",
    fontSize: 12,
  },
  negative: {
    color: "#f56565",
    fontSize: 12,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 4,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#e2e8f0",
    marginTop: 20,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
