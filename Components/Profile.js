import { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user, updatePassword, logout } = useContext(UserSessionContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Estado para mostrar el formulario de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handlePasswordChange = (name, value) => {
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleChangePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordData;

    if (currentPassword !== user.password) {
      Alert.alert("Error", "La contraseña actual no es correcta.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "Las nuevas contraseñas no coinciden.");
      return;
    }
    if (newPassword === currentPassword) {
      Alert.alert("Error", "La nueva contraseña debe ser diferente a la actual.");
      return;
    }

    // Llama a la función para actualizar la contraseña en el contexto
    updatePassword(newPassword);
    Alert.alert("Éxito", "La contraseña ha sido cambiada exitosamente.");
    setIsChangingPassword(false); // Cierra el formulario de cambio de contraseña
  };

  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <Text style={styles.label}>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        value={user.username}
        editable={false} // Campo no editable
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={user.email}
        editable={false} // Campo no editable
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          value={user.password}
          secureTextEntry={!showPassword} // Muestra la contraseña si `showPassword` es true
          editable={false} // Campo no editable
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"} // Cambia el icono según el estado
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      {/* Botón para abrir el formulario de cambio de contraseña */}
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => setIsChangingPassword(!isChangingPassword)}
      >
        <Text style={styles.changePasswordButtonText}>
          {isChangingPassword ? "Cancelar" : "Cambiar Contraseña"}
        </Text>
      </TouchableOpacity>

      {/* Formulario de cambio de contraseña */}
      {isChangingPassword && (
  <View style={styles.changePasswordForm}>
    <TextInput
      style={styles.input}
      placeholder="Contraseña Actual"
      value={passwordData.currentPassword}
      onChangeText={(value) => handlePasswordChange("currentPassword", value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Nueva Contraseña"
      value={passwordData.newPassword}
      onChangeText={(value) => handlePasswordChange("newPassword", value)}
    />
    <TextInput
      style={styles.input}
      placeholder="Confirmar Nueva Contraseña"
      value={passwordData.confirmNewPassword}
      onChangeText={(value) => handlePasswordChange("confirmNewPassword", value)}
    />
    <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
      <Text style={styles.saveButtonText}>Guardar Nueva Contraseña</Text>
    </TouchableOpacity>
  </View>
)}

       {/* Botón de Cerrar Sesión */}
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0d1421fd", // Fondo oscuro
  },
  title: {
    fontSize: 28,
    color: "#e4e4e4",
    marginBottom: 30,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#aaaaaa",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1e2533", // Fondo del campo
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555", // Color del borde
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 10,
    marginRight: 5,
  },
  changePasswordButton: {
    backgroundColor: "#1A2E47",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  changePasswordButtonText: {
    color: "#00AEEF",
    fontSize: 16,
    fontWeight: "bold",
  },
  changePasswordForm: {
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f44336", // Rojo para el botón de cerrar sesión
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "100%", // Ocupa todo el ancho disponible
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
