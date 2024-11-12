import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router"; // Importa useRouter para manejar la navegación
import TopGainers from "../Components/TopGainers";
import "@expo/metro-runtime";

export default function App() {
  const router = useRouter();

  return (
    <ScrollView style={styles.scroll}>
      <View>
        <TopGainers />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  profileLink: {
    padding: 15,
    backgroundColor: "#1A2E47", // Fondo del enlace
    alignItems: "center",
    marginBottom: 10,
  },
  profileLinkText: {
    color: "#00AEEF", // Color del texto del enlace
    fontSize: 16,
    fontWeight: "bold",
  },
});
