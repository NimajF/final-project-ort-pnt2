import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import coinAmountConverter from "../utils/coinAmountConverter";
import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";

export default function AddCoinModal({
  modalVisible,
  setModalVisible,
  coin,
  setToastVisible,
  toastVisible,
  infoAdded,
}) {
  const initialState = new Date();
  const [date, setDate] = useState(initialState);
  const [amount, setAmount] = useState(0);
  const [userCash, setUserCash] = useState(0);

  const handleAddCoin = () => {
    let total = coinAmountConverter(
      userCash,
      coin.market_data.current_price.usd
    );
    infoAdded(`Successfully added ${amount}x ${coin.symbol} - ${userCash}usdt`);
    setModalVisible(false);
    // alert(`Added ${total}x ${coin.symbol.toUpperCase()} - ${userCash} USDT`);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() =>{
    let total = coinAmountConverter(
      userCash,
      coin.market_data.current_price.usd
    );
    setAmount(total)
  }, [userCash])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>
              Add{" "}
              <Image
                source={{ uri: coin.image.small }}
                style={styles.cryptoImage}
              />
              {coin.name} to your Portfolio
            </Text>
          </View>
          <Text style={styles.modalDescription}>
            {date.toLocaleDateString()}
          </Text>
          <Text style={styles.label}>Enter your inversion (USDT)</Text>
          <TextInput
            style={styles.input}
            value={userCash}
            onChangeText={setUserCash}
            keyboardType="numeric"
            placeholder={`Enter your inversion`}
          />

          <Pressable
            style={[styles.button, styles.buttonAdd]}
            onPress={() => {
              handleAddCoin();
            }}
          >
            <Text style={styles.buttonText}>
              Add {amount} {coin.symbol.toUpperCase()}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(false);
              setToastVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Discard</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro transparente
  },
  cryptoImage: {
    alignSelf: "flex-start",
    width: 18,
    height: 18,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: "#29272a",
    borderRadius: 20,
    fontFamily: "Inter_18pt-Regular",
    padding: 30,
    alignItems: "start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  modalTitleContainer: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: '100%',
    backgroundColor: '#181818', 
    padding: 15,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
  },
  modalTitle: {
    color: '#f0f0f0', 
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Inter_18pt-Regular",
  },
  modalText: {
    color: "#fff",
    fontFamily: "Inter_18pt-Regular",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalDescription: {
    color: "#9e9e9e",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    marginTop: 35,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: "#FFF",
    fontFamily: "Inter_18pt-Regular",
  },
  input: {
    height: 40,
    width: 100,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#3a3a3c",
    fontFamily: "Inter_18pt-Regular",
    color: "white",
  },
  buttonAdd: {
    width: "100%",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#793afd",
    marginBottom: 10,
    fontFamily: "Inter_18pt-Regular",
  },
  buttonClose: {
    width: "100%",
    color: "#fff",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    fontFamily: "Inter_18pt-Regular",
    backgroundColor: "#ff4747",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter_18pt-Regular",
    fontSize: 12,
    fontWeight: "600",
  },
});
