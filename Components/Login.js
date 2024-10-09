import { useState } from "react";
import { router } from "expo-router";
import { View, Alert } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const { username, email, password } = user;

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleLogin = () => {
    Alert.alert(
      "User Information",
      `Username: ${user.username}\nEmail: ${user.email}\nPassword: ${user.password}`,
      [{ text: "OK" }]
    );
  };

  const handleReturnHome = () => {
    router.push("/");
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
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")} style={styles.registerLink}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.boldText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleReturnHome}>
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
    textDecorationLine: 'underline', // Subrayado para destacar el enlace
  },
});
