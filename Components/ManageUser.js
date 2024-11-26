import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { UserSessionContext } from "../contexts/UserSessionContext";

const API_URL = "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users";

export default function ManageUser() {
  const { user } = useContext(UserSessionContext);
  const router = useRouter(); // Hook para manejar navegación
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setIsUserLoaded(true);
      if (!user.admin) {
        router.push("/");
      } else {
        fetchUsers();
      }
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Ordenar los usuarios por ID
      const sortedUsers = data.sort((a, b) => a.id - b.id);
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Función para hacer un usuario administrador
  const makeAdmin = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin: true }),
      });
      if (!response.ok) throw new Error("Failed to make admin");
      Alert.alert("Éxito", "El usuario ahora es administrador.");
      setModalVisible(false);
      fetchUsers(); // Actualizar la lista
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al hacer al usuario administrador."
      );
      console.error(error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      Alert.alert("Éxito", "El usuario ha sido eliminado.");
      setModalVisible(false);
      fetchUsers(); // Actualizar la lista
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al eliminar al usuario.");
      console.error(error);
    }
  };

  // Renderizar cada usuario en la lista
  const renderUser = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userInfo}>
        ID: {item.id} - {item.username} - {item.email} -{" "}
        <Text style={styles.userType}>{item.admin ? "Admin" : "User"}</Text>
      </Text>
      <TouchableOpacity
        style={styles.modifyButton}
        onPress={() => {
          setSelectedUser(item); // Seleccionar usuario
          setModalVisible(true); // Mostrar pop-up
        }}
      >
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
      />

      {selectedUser && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Modificar Usuario: {selectedUser.username}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => makeAdmin(selectedUser.id)}
              >
                <Text style={styles.modalButtonText}>Make Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => deleteUser(selectedUser.id)}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d1421fd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e4e4e4",
    marginBottom: 20,
    textAlign: "center",
  },
  userContainer: {
    backgroundColor: "#1e2533",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    color: "#cfcfcf",
    fontSize: 16,
  },
  userType: {
    fontWeight: "bold",
    color: "#00AEEF",
  },
  modifyButton: {
    fontSize: 10,
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 5,
  },
  modifyButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1e2533",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  cancelButton: {
    backgroundColor: "#757575",
  },
});
