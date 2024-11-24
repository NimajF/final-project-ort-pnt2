import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user, updatePassword, logout } = useContext(UserSessionContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

    updatePassword(newPassword);
    Alert.alert("Éxito", "La contraseña ha sido cambiada exitosamente.");
    setIsChangingPassword(false);
  };

  const handleLogout = () => {
    logout();
  };
  const router = useRouter();


  return (
    <View style={styles.container}>
      {/* Imagen de perfil */}
      {user.image && (
        <Image source={{ uri: user.image }} style={styles.profileImage} />
      )}

      {/* Título dinámico basado en el tipo de usuario */}
      <Text style={styles.title}>
        {user.admin ? "Perfil de Administrador" : "Perfil de Usuario"}
      </Text>

      {/* Botón para modificar usuarios, solo visible para administradores */}
      {user.admin && (
        <TouchableOpacity
        style={styles.modifyUsersButton}
        onPress={() => router.push("/manageUser")}
      >
          <Text style={styles.modifyUsersButtonText}>MODIFICAR USUARIOS</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        value={user.username}
        editable={false}
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={user.email}
        editable={false}
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          value={user.password}
          secureTextEntry={!showPassword}
          editable={false}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => setIsChangingPassword(!isChangingPassword)}
      >
        <Text style={styles.changePasswordButtonText}>
          {isChangingPassword ? "Cancelar" : "Cambiar Contraseña"}
        </Text>
      </TouchableOpacity>

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
    backgroundColor: "#0d1421fd",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
    backgroundColor: "#1e2533",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555",
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
  modifyUsersButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  modifyUsersButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
