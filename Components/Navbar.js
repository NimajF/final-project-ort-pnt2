import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useContext } from 'react'; // Asegúrate de que useContext está importado aquí
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, usePathname } from 'expo-router';
import { UserSessionContext } from "../contexts/UserSessionContext"; // Importa el contexto de usuario
import AntDesign from '@expo/vector-icons/AntDesign';


export function Navbar(){
    const { user } = useContext(UserSessionContext); // Obtiene el estado del usuario
    const pathname = usePathname();

    // Función para definir el color del ícono según la ruta actual
    const iconColor = (path) => pathname === path ? "#fff" : '#585858';

    return (
        <View style={styles.navbar}>
          {/* Botón de Inicio */}
          <Pressable onPress={() => router.push("/")}>
            <Text><Entypo style={[styles.navIcon, {color: iconColor("/")}]} name="home" size={26} /></Text>
          </Pressable>
                    
          {/* Botón de Portafolio */}
          <Pressable onPress={() => router.push("/portfolio")}>
            <Text><FontAwesome6 style={[styles.navIcon, {color: iconColor("/portfolio")}]} name="book" size={26} /></Text>
          </Pressable> 

          {/* Botón de Perfil / Login */}
          <Pressable onPress={() => {
              if (user) {
                // Si el usuario está logueado, ir al perfil
                router.push("/profile");
              } else {
                // Si no está logueado, ir a la página de login
                router.push("/login");
              }
            }}>
            <Text><FontAwesome6 style={[styles.navIcon, {color: iconColor(user ? "/profile" : "/login")}]} name="user-large" size={26} /></Text>
          </Pressable>       
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#0a1120',
        fontSize: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    navIcon: {
        paddingHorizontal: 20,
        color: '#585858', // Color de los íconos cuando no están seleccionados
    },
});
