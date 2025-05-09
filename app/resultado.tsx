    import celularesData from '@/assets/data/celulares.json';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

    const getImage = (filename: string) => {
    switch (filename) {
        case 's23': return require('@/assets/images/s23.png');
        case 'iphone13': return require('@/assets/images/iphone13.png');
        case 'motoe32': return require('@/assets/images/motoe32.png');
        case 'redminote12': return require('@/assets/images/redminote12.png');
        case 'a14': return require('@/assets/images/a14.png');
        case 'xiaomi13': return require('@/assets/images/xiaomi13.png');
        default: return require('@/assets/images/default.png');
    }
    };

    export default function Resultado() {
    const { preferencias } = useUserPreferences();
    const router = useRouter();
    const modelo = celularesData.find((cel) => cel.nombre === preferencias.movilElegido);

    if (!modelo) {
        return (
        <View style={styles.container}>
            <Text style={styles.title}>No se encontró información del dispositivo seleccionado.</Text>
        </View>
        );
    }

    const guardarFavorito = async () => {
        try {
        const almacenados = await AsyncStorage.getItem('favoritos');
        const favoritos = almacenados ? JSON.parse(almacenados) : [];
        const yaExiste = favoritos.some((item: any) => item.id === modelo.id);

        if (!yaExiste) {
            favoritos.push(modelo);
            await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
            Alert.alert('Agregado a favoritos');
        } else {
            Alert.alert('Ya está en favoritos');
        }
        } catch (error) {
        console.error('Error al guardar en favoritos:', error);
        Alert.alert('Error al guardar el favorito');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{modelo.nombre}</Text>
        <Image source={getImage(modelo.id)} style={styles.image} />
        <Text style={styles.summary}>{modelo.resumen}</Text>

        <Text style={styles.sectionTitle}>Enlaces para comprar:</Text>
        {modelo.linksCompra &&
            Object.entries(modelo.linksCompra).map(([tienda, url]) => (
            <Pressable key={tienda} style={styles.button} onPress={() => Linking.openURL(url)}>
                <Text style={styles.buttonText}>Ver en {tienda}</Text>
            </Pressable>
            ))}

        <Text style={styles.sectionTitle}>Especificaciones:</Text>
        <Text style={styles.spec}>Marca: {modelo.marca}</Text>
        <Text style={styles.spec}>Precio: US${modelo.precio}</Text>
        <Text style={styles.spec}>Colores: {modelo.color.join(', ')}</Text>
        <Text style={styles.spec}>Tamaño: {modelo.tamano}</Text>
        <Text style={styles.spec}>Uso ideal: {modelo.usoIdeal.join(', ')}</Text>

        <Pressable style={styles.favButton} onPress={guardarFavorito}>
            <Text style={styles.buttonText}>Guardar en favoritos</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.replace('/home')}>
            <Text style={styles.buttonText}>Volver al inicio</Text>
        </Pressable>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center', marginBottom: 10 },
    summary: { fontSize: 16, color: '#444', marginBottom: 20, textAlign: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    image: { width: 180, height: 180, resizeMode: 'contain', marginBottom: 15 },
    button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, marginBottom: 10, width: '80%' },
    favButton: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, marginTop: 20, width: '80%' },
    backButton: { backgroundColor: '#1e40af', padding: 12, borderRadius: 8, marginTop: 10, width: '80%' },
    buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
    spec: { fontSize: 15, color: '#333', marginBottom: 5, textAlign: 'center' },
    });
