    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
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
    const { settings: config } = useAppSettings();

    const bgColor = config.modoOscuro ? '#111' : '#fff';
    const textColor = config.modoOscuro ? '#eee' : '#1e3a8a';
    const cardBg = config.modoOscuro ? '#222' : '#f0f0f0';
    const fontSize = getFontSize('medium', config.tamanioLetra);

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

    const confirmarEliminar = (id: string) => {
        Alert.alert(
        '¿Eliminar favorito?',
        '¿Estás seguro de que querés eliminar este dispositivo de favoritos?',
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', style: 'destructive', onPress: () => borrarFavorito(id) },
        ]
        );
    };

    const vaciarFavoritos = async () => {
        Alert.alert(
        'Vaciar todos los favoritos',
        '¿Estás seguro de que querés eliminar todos los favoritos?',
        [
            { text: 'Cancelar', style: 'cancel' },
            {
            text: 'Sí, eliminar',
            style: 'destructive',
            onPress: async () => {
                await AsyncStorage.removeItem('favoritos');
                setFavoritos([]);
                Alert.alert('Favoritos eliminados');
            },
            },
        ]
        );
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize } ]}>⭐ Tus favoritos</Text>

        {favoritos.length === 0 ? (
            <Text style={[styles.empty, { color: textColor }]}>No se guardó ningún dispositivo aún.</Text>
        ) : (
            <>
            <Pressable style={styles.clearButton} onPress={vaciarFavoritos}>
                <Text style={styles.clearText}>🗑️ Vaciar todos</Text>
            </Pressable>

            {favoritos.map((item) => (
                <View key={item.id} style={[styles.card, { backgroundColor: cardBg }]}>
                <Image source={getImage(item.id)} style={styles.image} />
                <Text style={[styles.name, { color: textColor, fontSize }]}>{item.nombre}</Text>
                <Text style={[styles.summary, { color: config.modoOscuro ? '#ccc' : '#555', fontSize }]}>
                    {item.resumen}
                </Text>

                <Pressable style={styles.button} onPress={() => verDetalle(item.nombre)}>
                    <Text style={[styles.buttonText, { fontSize }]}>Ver detalles</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => confirmarEliminar(item.id)}>
                    <Text style={[styles.deleteText, { fontSize }]}>Eliminar</Text>
                </Pressable>
                </View>
            ))}
            </>
        )}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontWeight: 'bold', marginBottom: 20 },
    empty: { marginTop: 30, textAlign: 'center' },
    card: { borderRadius: 10, padding: 15, marginBottom: 20, width: '100%', alignItems: 'center' },
    image: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 10 },
    name: { fontWeight: 'bold', marginBottom: 5 },
    summary: { textAlign: 'center', marginBottom: 10 },
    button: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, marginBottom: 5, width: '80%' },
    buttonText: { color: '#fff', textAlign: 'center' },
    deleteButton: { backgroundColor: '#dc2626', padding: 8, borderRadius: 8, width: '80%' },
    deleteText: { color: '#fff', textAlign: 'center' },
    clearButton: { backgroundColor: '#e11d48', padding: 10, borderRadius: 10, marginBottom: 20 },
    clearText: { color: '#fff', fontSize: 14 },
    });
