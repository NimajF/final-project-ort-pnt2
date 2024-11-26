import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useContext } from "react"; // Asegúrate de que useContext está importado aquí
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, usePathname } from "expo-router";
import { UserSessionContext } from "../contexts/UserSessionContext"; // Importa el contexto de usuario
import AntDesign from "@expo/vector-icons/AntDesign";

export function Navbar() {
  const { user } = useContext(UserSessionContext);
  const pathname = usePathname();

  const iconColor = (path) => (pathname === path ? "#fff" : "#585858");

  return (
    <View style={styles.navbar}>
      <Pressable onPress={() => router.push("/")}>
        <Text>
          <Entypo
            style={[styles.navIcon, { color: iconColor("/") }]}
            name="home"
            size={26}
          />
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/portfolio")}>
        <Text>
          <FontAwesome6
            style={[styles.navIcon, { color: iconColor("/portfolio") }]}
            name="book"
            size={26}
          />
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          if (user) {
            router.push(`/profile/${user.id}`);
          } else {
            router.push("/login");
          }
        }}
      >
        <Text>
          <FontAwesome6
            style={[
              styles.navIcon,
              { color: iconColor(user ? `/profile/${user.id}` : "/login") },
            ]}
            name="user-large"
            size={26}
          />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#0a1120",
    fontSize: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  navIcon: {
    paddingHorizontal: 20,
    color: "#585858", // Color de los íconos cuando no están seleccionados
  },
});
