import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import "@expo/metro-runtime";
import TopGainers from "../Components/TopGainers";

export default function App() {
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
});
