    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Subuso() {
    const { uso } = useLocalSearchParams();
    const router = useRouter();
    const { setPreferencias } = useUserPreferences();
    const { settings } = useAppSettings();
    const lang = settings.idioma;

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const labelColor = isDark ? '#ccc' : '#333';

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const labelFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    const [valores, setValores] = useState<Record<string, number>>({});

    const handleChange = (key: string, value: number) => {
        setValores((prev) => ({ ...prev, [key]: value }));
    };

    const continuar = () => {
        setPreferencias({
        uso: uso as string,
        sliders: valores,
        });
        router.push('/disponibilidad');
    };

    const slidersPorUso: Record<string, { label: string; key: string }[]> = {
        juegos: [
        { label: t('subuso.graficos', lang), key: 'graficos' },
        { label: t('subuso.casuales', lang), key: 'casuales' },
        { label: t('subuso.rendimiento', lang), key: 'rendimiento' },
        ],
        multimedia: [
        { label: t('subuso.camara', lang), key: 'camara' },
        { label: t('subuso.video', lang), key: 'video' },
        { label: t('subuso.edicion', lang), key: 'edicion' },
        ],
        trabajo: [
        { label: t('subuso.oficina', lang), key: 'oficina' },
        { label: t('subuso.multitarea', lang), key: 'multitarea' },
        { label: t('subuso.seguridad', lang), key: 'seguridad' },
        ],
        redes: [
        { label: t('subuso.fluidez', lang), key: 'fluidez' },
        { label: t('subuso.carga', lang), key: 'carga' },
        { label: t('subuso.notificaciones', lang), key: 'notificaciones' },
        ],
        otro: [
        { label: t('subuso.bateria', lang), key: 'bateria' },
        { label: t('subuso.facilidad', lang), key: 'facilidad' },
        { label: t('subuso.almacenamiento', lang), key: 'almacenamiento' },
        ],
    };

    const sliders = slidersPorUso[uso as string] || [];

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('subuso.titulo', lang)}
        </Text>

        {sliders.map((item) => (
            <View key={item.key} style={styles.sliderGroup}>
            <Text style={[styles.label, { color: labelColor, fontSize: labelFont }]}>{item.label}</Text>
            {Platform.OS !== 'web' ? (
                <Slider
                value={valores[item.key] || 5}
                onValueChange={(value) => handleChange(item.key, value)}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#2563eb"
                maximumTrackTintColor="#ccc"
                />
            ) : (
                <Text style={[styles.label, { color: labelColor }]}>
                {t('subuso.controlWeb', lang)}
                </Text>
            )}
            </View>
        ))}

        <Pressable style={styles.button} onPress={continuar}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>{t('subuso.continuar', lang)}</Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 30 },
    title: { fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    sliderGroup: { marginBottom: 30 },
    label: { marginBottom: 5 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 20 },
    buttonText: { color: '#fff', textAlign: 'center' },
    });
