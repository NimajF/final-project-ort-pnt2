import { ScrollView, StyleSheet, View } from "react-native";
import Profile from "../Components/Profile";
import PortfolioTable from "../Components/Portfolio";

export default function App() {
  return (
    <ScrollView style={styles.scroll}>
      <View>
        {/* <Profile /> */}
        <PortfolioTable />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});
