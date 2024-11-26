import { View, Text, StyleSheet } from "react-native";

export default function InfoTable({ handleSort }) {
  return (
    <View style={styles.tableHeader}>
      <Text
        style={[styles.headerText, styles.rankColumn]}
        onPress={() => handleSort("rank")}
      >
        #
      </Text>
      <Text
        style={[styles.headerText, styles.nameColumn]}
        onPress={() => handleSort("name")}
      >
        Name
      </Text>
      <Text
        style={[styles.headerText, styles.priceColumn]}
        onPress={() => handleSort("price")}
      >
        Price
      </Text>
      <Text
        style={[styles.headerText, styles.changeColumn]}
        onPress={() => handleSort("change")}
      >
        24h %
      </Text>
      <Text
        style={[styles.headerText, styles.marketCapColumn]}
        onPress={() => handleSort("marketCap")}
      >
        Market Cap
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    // borderBottomColor: "#3e8b5e",
    backgroundColor: "#182130",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: "#aaa",
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
  },
  rankColumn: {
    width: "10%",
    color: "#fff",
    textAlign: "center",
  },
  nameColumn: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    color: "#cfcfcf",
  },
  cryptoName: {
    color: "#fff",
  },
  priceColumn: {
    width: "20%",
    color: "#fff",
    textAlign: "right",
  },
  changeColumn: {
    width: "15%",
    textAlign: "right",
  },
  marketCapColumn: {
    width: "25%",
    color: "#fff",
    textAlign: "right",
  },
});
