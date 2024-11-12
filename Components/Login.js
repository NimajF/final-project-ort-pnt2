import { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { View, Alert, StyleSheet, Text, TextInput, TouchableOpacity, Pressable } from "react-native";

export default function Login() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const { login, logout, user } = useContext(UserSessionContext);
  const router = useRouter();
  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;

  // Este efecto observa el estado de `user` y redirige al perfil si el usuario está autenticado
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async () => {
    Alert.alert(
      "Información del Usuario",
      `Username: ${userData.username}\nPassword: ${userData.password}`,
      [{ text: "OK" }]
    );
    await login(userData.username, userData.password);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      {user ? (
        // Si el usuario está autenticado, muestra su nombre y botón de cerrar sesión
        <View>
          <Text style={styles.title}>Bienvenido, {user.username}!</Text>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      ) : (
        // Si no está autenticado, muestra el formulario de inicio de sesión
        <View>
          <Text style={styles.title}>Inicia sesión en tu cuenta</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={(value) => handleChange("username", value)}
            keyboardType="default"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </Pressable>

          <TouchableOpacity
            onPress={() => router.push("/register")}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              ¿No tienes una cuenta?{" "}
              <Text style={styles.boldText}>Regístrate</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.returnHome}>
              Regresar a la página de inicio
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0d1421fd", // Color de fondo
  },
  title: {
    fontSize: 28,
    color: "#e4e4e4",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1e2533", // Color de fondo de los campos
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555", // Color del borde
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#4caf50", // Color del botón
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#f44336", // Color del botón de cerrar sesión
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    color: "#bbbbbb",
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
    color: "#6960dd",
  },
  returnHome: {
    color: "#dddddd",
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: "underline", // Subrayado para destacar el enlace
  },
});
