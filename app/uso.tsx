    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Uso() {
    const router = useRouter();
    const { settings } = useAppSettings();
    const lang = settings.idioma;

    const yaLeido = useRef(false); // Para evitar repetición dentro de una misma visita

    // Opciones disponibles de uso principal del teléfono
    const usos = [
        { label: t('uso.redes', lang), value: 'redes' },
        { label: t('uso.multimedia', lang), value: 'multimedia' },
        { label: t('uso.juegos', lang), value: 'juegos' },
        { label: t('uso.trabajo', lang), value: 'trabajo' },
        { label: t('uso.otro', lang), value: 'otro' },
    ];

    // Al seleccionar un uso, se redirige a la pantalla de subusos, pasando el valor seleccionado
    const seleccionarUso = (tipo: string) => {
        router.push({ pathname: '/subuso', params: { uso: tipo } });
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const titleFont = getFontSize('large', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    // Activación del lector de pantalla solo una vez por cada entrada a la pantalla
    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            const mensaje =
            `${t('uso.titulo', lang)}. ` +
            (lang === 'es'
                ? 'Seleccioná una opción que describa tu uso principal del celular.'
                : 'Choose one option that best describes your main phone usage.');
            if (!yaLeido.current) {
            speak(mensaje, settings);
            yaLeido.current = true;
            }
        }

        // Al desmontar, se reinicia el estado para permitir repetir el mensaje en próximas visitas
        return () => {
            yaLeido.current = false; 
        };
        }, [settings.lectorPantalla, lang])
    );

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { fontSize: titleFont, color: textColor }]}>
            {t('uso.titulo', lang)}
        </Text>
        {usos.map((uso) => (
            <Pressable key={uso.value} style={styles.button} onPress={() => seleccionarUso(uso.value)}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>{uso.label}</Text>
            </Pressable>
        ))}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center' },
    title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
    button: {
        backgroundColor: '#2563eb',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    });
