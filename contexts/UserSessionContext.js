import { createContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState("checking");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cargarEstadoAuth = async () => {
      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
      const userData = await AsyncStorage.getItem("userData");

      if (isAuthenticated === "true" && userData) {
        setUser(JSON.parse(userData));
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    };

    cargarEstadoAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users"
      );
      const data = await response.json();
      const user = data.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        await AsyncStorage.setItem("isAuthenticated", "true");
        await AsyncStorage.setItem("userData", JSON.stringify(user));
        setUser(user);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch (error) {
      console.error(error);
      alert("Error en la autenticacion");
    }
  };

  const register = async (usuario) => {
    try {
      const response = await fetch(
        "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users"
      );
      const data = await response.json();

      const userExist = data.some((u) => u.username === usuario.username);
      const emailExist = data.some((u) => u.email === usuario.email);

      if (userExist) {
        alert("Usuario ya registrado");
      } else if (emailExist) {
        alert("Email ya registrado");
      } else {
        const body = JSON.stringify(usuario);

        const response = await fetch(
          "https://66fc939ac3a184a84d175ec7.mockapi.io/api/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: body,
          }
        );

        if (response.ok) {
          alert("Registro Exitoso");
          router.push("/");
        } else {
          alert("Error al registrar el usuario");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Error en la autenticacion");
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isAuthenticated");
      await AsyncStorage.removeItem("userData");
      setUser(null);
      setStatus("unauthenticated");
      router.push("/login"); // Redirigir a la pantalla de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };



  const updatePassword = async (newPassword) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      alert("Contraseña actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      alert("No se pudo actualizar la contraseña");
    }
  };

  return (
    <UserSessionContext.Provider
      value={{ login, register, logout, status, user, setUser, updatePassword }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};
