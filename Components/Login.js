import { useEffect, useState } from "react";
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
        keyboardType="username"
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
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={() => console.log(user)}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text
            style={{
              fontFamily: "Inter_18pt-Regular",
              color: "#6960dd",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReturnHome}>
        <Text style={styles.returnHome}>Return to home </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%", // Asegúrate de que la imagen cubra todo el ancho
    height: "100%", // Asegúrate de que la imagen cubra todo el alto
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // Ajusta la opacidad si la imagen se ve demasiado brillante
    width: "100%", // Asegúrate de que la imagen ocupe todo el ancho disponible
    height: "100%", // Asegúrate de que la imagen ocupe todo el alto disponible
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 600,
    backgroundColor: "#0d1421fd", // Fondo de la tarjeta
    padding: 35,
    paddingTop: 30,
    paddingBottom: 170,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra para la tarjeta en Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // marginTop: '-5rem',
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 24,
    color: "#e4e4e4",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#060d1a",
    // border: "1px solid #162238",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#58af5f",
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: "Inter_18pt-Regular",
    color: "#fff",
  },
  registerText: {
    fontFamily: "Inter_18pt-Regular",
    color: "#bbbbbb",
    marginTop: 20,
    fontSize: 14,
  },
  returnHome: {
    fontFamily: "Inter_18pt-Regular",
    color: "#dddddd",
    marginTop: 10,
    fontSize: 14,
  },
});
