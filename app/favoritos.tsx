    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { getImage } from '@/utils/getImage';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Pantalla de favoritos. Muestra los celulares guardados y permite eliminarlos.
    export default function Favoritos() {
    const [favoritos, setFavoritos] = useState<any[]>([]);
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();
    const { settings } = useAppSettings();

    const lang = settings.idioma;
    const bgColor = settings.modoOscuro ? '#111' : '#fff';
    const textColor = settings.modoOscuro ? '#eee' : '#1e3a8a';
    const cardBg = settings.modoOscuro ? '#222' : '#f0f0f0';
    const fontSize = getFontSize('medium', settings.tamanioLetra);

    // Al mostrar la pantalla, se cargan los favoritos guardados en AsyncStorage
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

    // Si el lector está activado, se anuncia el contenido de la pantalla
    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            const mensaje = `${t('favoritos.lector.titulo', lang)}. ${t('favoritos.lector.bienvenida', lang)}`;
            speak(mensaje, settings);
        }
        }, [settings])
    );


    // Guarda en contexto el móvil seleccionado y navega al detalle
    const verDetalle = (nombre: string) => {
        setPreferencias({ ...preferencias, movilElegido: nombre });
        router.push('/resultado');
    };

    // Borra un favorito de la lista
    const borrarFavorito = async (id: string) => {
        const nuevos = favoritos.filter((cel) => cel.id !== id);
        await AsyncStorage.setItem('favoritos', JSON.stringify(nuevos));
        setFavoritos(nuevos);
        Alert.alert(t('favoritos.eliminar', lang));
    };

    // Confirma antes de borrar un único favorito
    const confirmarEliminar = (id: string) => {
        Alert.alert(
        t('favoritos.eliminar', lang),
        t('favoritos.eliminarConfirmar', lang),
        [
            { text: t('configuracion.cancelar', lang), style: 'cancel' },
            { text: t('favoritos.eliminar', lang), style: 'destructive', onPress: () => borrarFavorito(id) },
        ]
        );
    };

    // Vacía toda la lista de favoritos
    const vaciarFavoritos = async () => {
        Alert.alert(
        t('favoritos.vaciar', lang),
        t('favoritos.vaciarConfirmar', lang),
        [
            { text: t('configuracion.cancelar', lang), style: 'cancel' },
            {
            text: t('favoritos.vaciar', lang),
            style: 'destructive',
            onPress: async () => {
                await AsyncStorage.removeItem('favoritos');
                setFavoritos([]);
                Alert.alert(t('favoritos.vaciar', lang));
            },
            },
        ]
        );
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize }]}>{t('favoritos.titulo', lang)}</Text>

        {favoritos.length === 0 ? (
            <Text style={[styles.empty, { color: textColor }]}>{t('favoritos.ninguno', lang)}</Text>
        ) : (
            <>
            <Pressable style={styles.clearButton} onPress={vaciarFavoritos}>
                <Text style={styles.clearText}>{t('favoritos.vaciar', lang)}</Text>
            </Pressable>

            {favoritos.map((item) => (
                <View key={item.id} style={[styles.card, { backgroundColor: cardBg }]}>
                <Image source={getImage(item.id)} style={styles.image} />
                <Text style={[styles.name, { color: textColor, fontSize }]}>{item.nombre}</Text>
                <Text style={[styles.summary, { color: settings.modoOscuro ? '#ccc' : '#555', fontSize }]}>
                    {item.resumen}
                </Text>

                <Pressable style={styles.button} onPress={() => verDetalle(item.nombre)}>
                    <Text style={[styles.buttonText, { fontSize }]}>{t('favoritos.verDetalles', lang)}</Text>
                </Pressable>

                <Pressable style={styles.deleteButton} onPress={() => confirmarEliminar(item.id)}>
                    <Text style={[styles.deleteText, { fontSize }]}>{t('favoritos.eliminar', lang)}</Text>
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
