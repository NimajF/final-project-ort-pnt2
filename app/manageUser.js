import { ScrollView, StyleSheet, View } from "react-native";
import ManageUser from "../Components/ManageUser";

export default function App() {
  return (
    <ScrollView style={styles.scroll}>
      <View>
        <ManageUser />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
});
