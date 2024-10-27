import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SelectForApi({ handleOption }) {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
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
});
