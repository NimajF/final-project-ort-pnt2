import { ScrollView, StyleSheet, View } from "react-native";
import Profile from "../Components/Profile";

export default function App() {
  return (
    <ScrollView style={styles.scroll}>
      <View>
        <Profile />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
});
