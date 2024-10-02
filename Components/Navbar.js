import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router, usePathname } from 'expo-router';


export function Navbar(){
    const [selected, setSelected] = useState('home');
    const pathname = usePathname();

    const iconColor = pathname === "/" ? "#fff" : '#585858';
    

    return (
        <View style={styles.navbar}>
        <Pressable onPress={() => router.push("/")}>
          <Text><Entypo style={[styles.navIcon, {color: iconColor} ]} name="home" size={26} color="black" /></Text>
        </Pressable>
        <Pressable onPress={() => router.push("/login")}>
          <Text><FontAwesome6 style={styles.navIcon} name="user-large" size={26} color="black" /></Text>
        </Pressable>       
      </View>
    )
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
        color: '#585858',
      },
})