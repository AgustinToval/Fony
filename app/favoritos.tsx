    import { useUserPreferences } from '@/context/UserPreferencesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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

    export default function Favoritos() {
    const [favoritos, setFavoritos] = useState<any[]>([]);
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();

    useEffect(() => {
        const obtenerFavoritos = async () => {
        try {
            const almacenados = await AsyncStorage.getItem('favoritos');
            if (almacenados) {
            setFavoritos(JSON.parse(almacenados));
            }
        } catch (error) {
            console.error('Error al cargar favoritos:', error);
        }
        };

        obtenerFavoritos();
    }, []);

    const verDetalle = (nombre: string) => {
        setPreferencias({ ...preferencias, movilElegido: nombre });
        router.push('/resultado');
    };

    const borrarFavorito = async (id: string) => {
        const nuevos = favoritos.filter((cel) => cel.id !== id);
        await AsyncStorage.setItem('favoritos', JSON.stringify(nuevos));
        setFavoritos(nuevos);
        Alert.alert('Eliminado de favoritos');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>⭐ Tus favoritos</Text>

        {favoritos.length === 0 ? (
            <Text style={styles.empty}>No guardaste ningún dispositivo aún.</Text>
        ) : (
            favoritos.map((item) => (
            <View key={item.id} style={styles.card}>
                <Image source={getImage(item.id)} style={styles.image} />
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.summary}>{item.resumen}</Text>

                <Pressable style={styles.button} onPress={() => verDetalle(item.nombre)}>
                <Text style={styles.buttonText}>Ver detalles</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => borrarFavorito(item.id)}>
                <Text style={styles.deleteText}>Eliminar</Text>
                </Pressable>
            </View>
            ))
        )}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20 },
    empty: { fontSize: 16, color: '#444', marginTop: 30, textAlign: 'center' },
    card: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 15, marginBottom: 20, width: '100%', alignItems: 'center' },
    image: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 10 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    summary: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 10 },
    button: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, marginBottom: 5, width: '80%' },
    buttonText: { color: '#fff', textAlign: 'center' },
    deleteButton: { backgroundColor: '#dc2626', padding: 8, borderRadius: 8, width: '80%' },
    deleteText: { color: '#fff', textAlign: 'center' },
    });
