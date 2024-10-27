import { useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router"; // Asegúrate de tener esto configurado correctamente

export default function Register() {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { username, email, password, confirmPassword } = user;

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const validateInputs = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://67030d8fbd7c8c1ccd407a1d.mockapi.io/api/prueba_de_usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: "user", // Puedes establecer un rol predeterminado
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();
      Alert.alert("Éxito", "Registro exitoso");
      router.push("/login"); // Redirige al login después del registro
    } catch (err) {
      setError("Error en el registro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
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
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerButtonText}>Registrar</Text>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#58af5f",
    fontSize: 16,
    marginBottom: 20,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: 10,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
