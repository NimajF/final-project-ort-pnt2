import { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PortfolioTable from "./Portfolio";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { UserPortfolioContext } from "../contexts/UserPortfolioContext";

export default function Profile() {
  const { user } = useContext(UserSessionContext);
  const { pnl } = useContext(UserPortfolioContext);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.image || "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user?.username || "Guest User"}</Text>
          <Text style={styles.email}>{user?.email || "Not logged in"}</Text>
        </View>
      </View>

      <View style={styles.portfolioSection}>
        <View style={styles.totalPnlContainer}>
          <Text style={styles.totalPnlLabel}>Total PnL: </Text>
          <Text
            style={[
              styles.totalPnlValue,
              { color: pnl >= 0 ? "#17d841" : "#d83737" },
            ]}
          >
            {pnl !== null && pnl !== undefined ? `$ ${pnl}` : "Loading..."}
          </Text>
        </View>
        <PortfolioTable />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2d3748",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#4A5568",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e2e8f0",
  },
  email: {
    fontSize: 14,
    color: "#cbd5e0",
  },
  portfolioSection: {
    fontFamily: "Inter_18pt-Regular",
    marginTop: 10,
    backgroundColor: "#2a303c",
    borderRadius: 8,
    paddingTop: 10,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a0aec0",
    marginBottom: 8,
  },
  totalPnlContainer: {
    padding: 10,
  },
  totalPnlLabel: {
    fontSize: 12,
    fontFamily: "Inter_18pt-Regular",
    fontWeight: "bold",
    color: "#babfc5",
  },
  totalPnlValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
