    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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
        router.push('/preferencias');
    };

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
                {simbolo}{monto}
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
