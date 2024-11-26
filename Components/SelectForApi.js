import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SelectForApi({ handleOption }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleButtonPress = (option) => {
    setSelectedOption(option);
    handleOption(option); // Llama a handleOption en TopGainers
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 0
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handleButtonPress(0)}
      >
        <Text style={styles.buttonText}>Top Gainers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 1
            ? styles.selectedButton
            : styles.unselectedButton,
        ]}
        onPress={() => handleButtonPress(1)}
      >
        <Text style={styles.buttonText}>Top Losers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#00AEEF", // Color celeste para el botón seleccionado
  },
  unselectedButton: {
    backgroundColor: "#1A2E47", // Color azul oscuro para el botón no seleccionado
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
