import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const endpoints = [
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=10&price_change_percentage=1h%2C24h%2C7d",
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_asc&per_page=10&price_change_percentage=24h",
];

export default function SelectForApi({option}) {
  const [selectedOption, setSelectedOption] = useState(0);

  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Option</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => {
            setSelectedOption(itemValue)
            option(endpoints[itemValue])
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
    marginBottom: 20,
    fontFamily: "Inter_18pt-Regular",
    border: "none",
  },
  picker: {
    color: "#fff",
    height: 30,
    borderRadius: 10,
    fontSize: 12,
    fontFamily: "Inter_18pt-Regular",
    backgroundColor: "#25253a",
    border: "none",
    
  },
});
