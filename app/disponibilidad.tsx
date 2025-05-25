    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import Slider from '@react-native-community/slider';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Disponibilidad() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();
    const { settings } = useAppSettings();

    const simbolo = settings.moneda === 'EUR' ? '€' : 'US$';
    const tasa = settings.moneda === 'EUR' ? 0.93 : 1;
    const [monto, setMonto] = useState(500);

    const continuar = () => {
        const valorUSD = Math.round(monto / tasa);
        setPreferencias({ ...preferencias, presupuesto: valorUSD });

        if (settings.lectorPantalla) {
        const mensaje =
            settings.idioma === 'es'
            ? `Continuando con un presupuesto de ${simbolo}${monto}`
            : `Continuing with a budget of ${simbolo}${monto}`;
        speak(mensaje, settings);
        }

        setTimeout(() => router.push('/preferencias'), 1000);
    };

    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            const mensaje = `${t('disponibilidad.pregunta', settings.idioma)}. ${
            settings.idioma === 'es'
                ? 'Deslice el punto de la barra para seleccionar su disponibilidad económica.'
                : 'Slide the dot to select your available budget.'
            }`;
            speak(mensaje, settings);
        }
        }, [settings])
    );

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { fontSize: getFontSize('large', settings.tamanioLetra), color: textColor }]}>
            {t('disponibilidad.pregunta', settings.idioma)}
        </Text>

        {Platform.OS !== 'web' ? (
            <>
            <Text style={[styles.amount, { fontSize: getFontSize('medium', settings.tamanioLetra), color: '#2563eb' }]}>
                {simbolo}
                {monto}
            </Text>
            <Slider
                value={monto}
                onValueChange={setMonto}
                minimumValue={100}
                maximumValue={2000}
                step={50}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#ccc"
            />
            </>
        ) : (
            <Text style={[styles.warning, { fontSize: getFontSize('small', settings.tamanioLetra), color: '#888' }]}>
            {t('disponibilidad.controlWeb', settings.idioma)}
            </Text>
        )}

        <Pressable style={styles.button} onPress={continuar}>
            <Text style={[styles.buttonText, { fontSize: getFontSize('medium', settings.tamanioLetra) }]}>
            {t('disponibilidad.continuar', settings.idioma)}
            </Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center' },
    title: { fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    amount: { textAlign: 'center', marginBottom: 10 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 30 },
    buttonText: { color: '#fff', textAlign: 'center' },
    warning: { textAlign: 'center', marginVertical: 20 },
    });
