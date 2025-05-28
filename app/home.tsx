    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Pantalla principal de la app. Punto de entrada con accesos a las secciones clave.
    export default function Home() {
    const router = useRouter();
    const { settings } = useAppSettings();
    const { colors } = useTheme();

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

      // Anuncia la pantalla si el lector está activado. Se para al salir para evitar solapamientos.
    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            speak(t('home.lector.bienvenida', settings.idioma), settings);
        }

        return () => {
            Speech.stop(); // Detiene el lector al cambiar de pantalla
        };
        }, [settings])
    );

    // Función genérica para manejar los botones con feedback por voz y navegación
    const manejarBoton = (destino: string, mensaje: string) => {
        if (settings.lectorPantalla) speak(mensaje, settings);
        setTimeout(() => router.push(destino as any), 1500); // Da tiempo a que se escuche el mensaje
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable
            style={styles.settingsIcon}
            onPress={() => manejarBoton('/configuracion', t('home.lector.configuracion', settings.idioma))}
        >
            <Ionicons name="settings-outline" size={26} color={colors.text} />
        </Pressable>

        <Text style={[styles.title, { fontSize: titleFont, color: colors.text }]}>
            {t('home.bienvenida', settings.idioma)}
        </Text>
        <Text style={[styles.subtitle, { fontSize: subtitleFont, color: colors.text }]}>
            {t('home.pregunta', settings.idioma)}
        </Text>

        <Pressable style={styles.button} onPress={() => manejarBoton('/perfil', t('home.buscar', settings.idioma))}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>📱 {t('home.buscar', settings.idioma)}</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => manejarBoton('/favoritos', t('home.favoritos', settings.idioma))}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>⭐ {t('home.favoritos', settings.idioma)}</Text>
        </Pressable>

        <Pressable
            style={styles.button}
            onPress={() => manejarBoton('/sugerencias', t('home.sugerencias', settings.idioma))}
        >
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>🛒 {t('home.sugerencias', settings.idioma)}</Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    });
