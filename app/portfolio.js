import { ImageBackground, View, StyleSheet, Text } from "react-native";
import Portfolio from "../Components/Portfolio";

export default function portfolio() {
  return (
    <Portfolio/>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDiv: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#172236ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 30,
    shadowColor: '#163d85ff',
    shadowOffset: { width: 12, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  title: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
