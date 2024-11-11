import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Alert } from "react-native";

const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users"; // Ajusta el endpoint

export default function AddToFavoritesModal({
  userId, // Agrega el ID del usuario que se va a actualizar
  coin,
  modalVisible,
  setModalVisible,
  toastVisible,
}) {
  const [loading, setLoading] = useState(false);

  const handleAddFavorite = async () => {
    setLoading(true);

    try {
      // Paso 1: Obtener el usuario actual
      const response = await fetch(`${API_URL}/${users / id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario");
      }

      const userData = await response.json();
      const updatedFavorites = [
        ...userData.favorites,
        { name: coin.name, symbol: coin.symbol },
      ];

      // Paso 2: Actualizar el array `favorites` con una solicitud `PUT`
      const updateResponse = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: updatedFavorites }),
      });

      if (!updateResponse.ok) {
        throw new Error("No se pudo agregar la moneda como favorita");
      }

      Alert.alert("Éxito", `Se agregó ${coin.name} a tus favoritos`);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al agregar la moneda");
    } finally {
      setLoading(false);
    }
  };

  // Llama a handleAddFavorite cuando toastVisible sea true
  useEffect(() => {
    if (toastVisible) {
      handleAddFavorite();
    }
  }, [modalVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Agregar a Favoritos</Text>
          <Text style={styles.coinName}>{coin.name}</Text>

          <Pressable
            style={[styles.button, styles.buttonAdd]}
            onPress={handleAddFavorite}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Agregando..." : "Agregar a Favoritos"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cerrar</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "#29272a",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  coinName: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonAdd: {
    backgroundColor: "#793afd",
  },
  buttonClose: {
    backgroundColor: "#ff4747",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
