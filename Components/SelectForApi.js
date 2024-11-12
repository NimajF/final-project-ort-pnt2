import { useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity  } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SelectForApi({ handleOption }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [endpoint, setEndpoint] = useState(0);
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setEndpoint(option === "gainers" ? 0 : 1); // Cambia el endpoint según la opción elegida
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.label}>Select Option</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue) => {
              setSelectedOption(itemValue);
              handleOption(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Top Gainers" value={0} />
            <Picker.Item label="Top Losers" value={1} />  
          </Picker>
        </View>
      </View>
      {/* Botones de selección */}
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === "gainers" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleOptionChange("gainers")}
      >
        <Text style={styles.buttonText}>Top Gainers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionButton,
          selectedOption === "losers" ? styles.selectedButton : styles.unselectedButton,
        ]}
        onPress={() => handleOptionChange("losers")}
      >
        <Text style={styles.buttonText}>Top Losers</Text>
      </TouchableOpacity>
    </View>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    flex: 1,
    width: 100,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Inter_18pt-Regular",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    marginBottom: 15,
    fontFamily: "Inter_18pt-Regular",
    border: "none",
  },
  picker: {
    color: "#fff",
    height: "auto",
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "Inter_18pt-Regular",
    backgroundColor: "#25253a",
    border: "none",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#00AEEF", // Celeste para el botón seleccionado
  },
  unselectedButton: {
    backgroundColor: "#1A2E47", // Azul oscuro para el botón no seleccionado
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
