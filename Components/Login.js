import { useState, useContext } from "react";
import { router, useRouter } from "expo-router";
import { UserSessionContext } from "../contexts/UserSessionContext";
import { View, Alert } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function Login() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const { login } = useContext(UserSessionContext);
  const router = useRouter();
  const [user, setUser] = useState(initialState);
  const { username, password } = user;

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    Alert.alert(
      123
      // "User Information",
      // `Username: ${user.username}\nPassword: ${user.password}`,
      // [{ text: "OK" }]
    );
    await login(user.username, user.password);
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log into your account</Text>
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
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.boldText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.returnHome}>Return to home </Text>
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
