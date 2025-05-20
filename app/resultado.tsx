    import celularesData from '@/assets/data/celulares.json';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { getImage } from '@/utils/getImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

    export default function Resultado() {
    const { preferencias } = useUserPreferences();
    const { settings } = useAppSettings();
    const router = useRouter();

    const modelo = celularesData.find((cel) => cel.nombre === preferencias.movilElegido);

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const secondaryText = isDark ? '#ccc' : '#444';
    const specColor = isDark ? '#ccc' : '#333';

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const bodyFont = getFontSize('small', settings.tamanioLetra);

    const convertirPrecio = (precioUSD: number) => {
        return settings.moneda === 'EUR'
        ? Math.round(precioUSD * 0.92)
        : precioUSD;
    };

    const simbolo = settings.moneda === 'EUR' ? '€' : 'US$';

    if (!modelo) {
        return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <Text style={[styles.title, { color: textColor }]}>
            No se encontró información del dispositivo seleccionado.
            </Text>
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
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { fontSize: titleFont, color: textColor }]}>{modelo.nombre}</Text>
        <Image source={getImage(modelo.id)} style={styles.image} />
        <Text style={[styles.summary, { fontSize: bodyFont, color: secondaryText }]}>{modelo.resumen}</Text>

        <Text style={[styles.sectionTitle, { fontSize: subtitleFont, color: textColor }]}>Enlaces para comprar:</Text>
        {modelo.linksCompra &&
            Object.entries(modelo.linksCompra).map(([tienda, url]) => (
            <Pressable key={tienda} style={styles.button} onPress={() => Linking.openURL(url)}>
                <Text style={[styles.buttonText, { fontSize: bodyFont }]}>Ver en {tienda}</Text>
            </Pressable>
            ))}

        <Text style={[styles.sectionTitle, { fontSize: subtitleFont, color: textColor }]}>Especificaciones:</Text>
        <Text style={[styles.spec, { color: specColor }]}>Marca: {modelo.marca}</Text>
        <Text style={[styles.spec, { color: specColor }]}>Precio: {simbolo}{convertirPrecio(modelo.precio)}</Text>
        <Text style={[styles.spec, { color: specColor }]}>Colores: {modelo.color.join(', ')}</Text>
        <Text style={[styles.spec, { color: specColor }]}>Tamaño: {modelo.tamano}</Text>
        <Text style={[styles.spec, { color: specColor }]}>Uso ideal: {modelo.usoIdeal.join(', ')}</Text>

        <Pressable style={styles.favButton} onPress={guardarFavorito}>
            <Text style={[styles.buttonText, { fontSize: bodyFont }]}>Guardar en favoritos</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.replace('/home')}>
            <Text style={[styles.buttonText, { fontSize: bodyFont }]}>Volver al inicio</Text>
        </Pressable>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    summary: { marginBottom: 20, textAlign: 'center' },
    sectionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    image: { width: 180, height: 180, resizeMode: 'contain', marginBottom: 15 },
    button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, marginBottom: 10, width: '80%' },
    favButton: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, marginTop: 20, width: '80%' },
    backButton: { backgroundColor: '#1e40af', padding: 12, borderRadius: 8, marginTop: 10, width: '80%' },
    buttonText: { color: '#fff', textAlign: 'center' },
    spec: { fontSize: 15, marginBottom: 5, textAlign: 'center' },
    });
