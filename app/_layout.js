import { Slot, useSegments } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { UserSessionProvider } from "../contexts/UserSessionContext";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import { UserPortfolioProvider } from "../contexts/UserPortfolioContext";
import { Navbar } from "../Components/Navbar";

const Layout = ({ children }) => {
  const [loaded, error] = useFonts({
    "Inter_18pt-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const segments = useSegments();
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  } else {
    return (
      <UserSessionProvider>
       {/* <UserPortfolioProvider> */}
        <RootSiblingParent>
          <View
            style={[
              styles.container,
              { paddingBottom: segments && segments[0] === "login" ? 0 : 60 },
            ]}
          >
            <Slot />
            {segments && segments[0] !== "login" ? <Navbar /> : null}
            <Toast />
          </View>
        </RootSiblingParent>
       {/* </UserPortfolioProvider> */}
      </UserSessionProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Inter_18pt-Regular",
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#0d1421",
    alignItems: "center",
    width: "100%",
  },
});
export default Layout;
