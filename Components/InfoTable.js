import { View, Text, StyleSheet } from "react-native";

export default function InfoTable() {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.rankColumn]}>#</Text>
      <Text style={[styles.headerText, styles.nameColumn]}>Name</Text>
      <Text style={[styles.headerText, styles.priceColumn]}>Price</Text>
      <Text style={[styles.headerText, styles.changeColumn]}>24h %</Text>
      <Text style={[styles.headerText, styles.marketCapColumn]}>
        Market Cap
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#3e8b5e',
    },
    headerText: {
      color: '#aaa',
      fontFamily: "Inter_18pt-Regular",
      fontWeight: 'bold',
    },
    rankColumn: {
      width: '10%',
      color: '#fff',
      textAlign: 'center',
    },
    nameColumn: {
      width: '30%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    cryptoName: {
      color: '#fff',
    },
    priceColumn: {
      width: '20%',
      color: '#fff',
      textAlign: 'right',
    },
    changeColumn: {
      width: '15%',
      textAlign: 'right',
    },
    marketCapColumn: {
      width: '25%',
      color: '#fff',
      textAlign: 'right',
    },
  });