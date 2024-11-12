import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Portfolio() {
    return (
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.titleDiv}>
            <Text style={styles.title}>Coinfolio - Portfolio</Text>
          </View>
          {/* Aquí puedes añadir más contenido relacionado al portafolio */}
        </ImageBackground>
      );
    }
    
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleDiv: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#172236ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 30,
        shadowColor: '#163d85ff',
        shadowOffset: { width: 12, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
      },
      title: {
        fontFamily: 'Inter_18pt-Regular',
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 2,
      },
    });