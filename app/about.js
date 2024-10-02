import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Coinfolio - Spot Portfolio Manager App</Text>
      <Text style={styles.description}>
        Coinfolio is a mobile application designed to help
        users track and manage their cryptocurrency investments in the spot
        market. With an intuitive and user-friendly interface, the app allows
        users to easily add, monitor, and update their holdings in various
        cryptocurrencies. Users can input their buy and sell transactions, view
        real-time prices, and analyze the performance of their portfolio over
        time.
      </Text>

      <Text style={styles.subtitle}>Key Features</Text>

      <Text style={styles.feature}>
        • Portfolio Overview: Track the total value of your cryptocurrency
        holdings in real time, with detailed insights into each coin's
        performance.
      </Text>

      <Text style={styles.feature}>
        • Transaction Tracking: Add buy and sell transactions for each asset to
        accurately monitor your spot portfolio.
      </Text>

      <Text style={styles.feature}>
        • Real-Time Data: Get up-to-date market data for a wide range of
        cryptocurrencies, including prices, market capitalization, and volume.
      </Text>

      <Text style={styles.feature}>
        • Profit/Loss Calculation: View your overall profits or losses based on
        current market prices compared to your entry prices.
      </Text>

      <Text style={styles.feature}>
        • Custom Notifications: Set up alerts for price changes, allowing you to
        stay updated on market movements.
      </Text>

      <Text style={styles.conclusion}>
        Ideal for both beginners and experienced traders, the Spot Portfolio
        Manager simplifies the process of managing your crypto investments in
        the spot market, providing you with all the tools you need to make
        informed decisions and maximize your returns.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1421", // Fondo oscuro
    padding: 20,
  },
  title: {
    color: "#1e90ff", // Azul para el título
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Inter_18pt-Regular",
  },
  subtitle: {
    color: "#fff", // Blanco para el subtítulo
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Inter_18pt-Regular",
  },
  description: {
    color: "#ccc", // Gris claro para el texto de la descripción
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
    fontFamily: "Inter_18pt-Regular",
  },
  feature: {
    color: "#fff", // Blanco para los detalles de las características
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
    fontFamily: "Inter_18pt-Regular",
  },
  conclusion: {
    color: "#ccc", // Gris claro para el texto final
    fontSize: 16,
    marginTop: 20,
    lineHeight: 22,
    fontFamily: "Inter_18pt-Regular",
  },
});
