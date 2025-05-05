import { useUserPreferences } from '@/context/UserPreferencesContext';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Subuso() {
    const { uso } = useLocalSearchParams();
    const router = useRouter();
    const { setPreferencias } = useUserPreferences();

    const [valores, setValores] = useState<Record<string, number>>({});

    const handleChange = (key: string, value: number) => {
    setValores((prev) => ({ ...prev, [key]: value }));
    };

    const continuar = () => {
    setPreferencias({
        uso: uso as string,
        sliders: valores,
    });
    router.push('/resultado');
    };

    const slidersPorUso: Record<string, { label: string; key: string }[]> = {
    juegos: [
        { label: 'Gráficos avanzados', key: 'graficos' },
        { label: 'Juegos casuales', key: 'casuales' },
        { label: 'Velocidad y respuesta', key: 'rendimiento' },
    ],
    multimedia: [
        { label: 'Calidad de la cámara', key: 'camara' },
        { label: 'Video y grabación', key: 'video' },
        { label: 'Edición de fotos', key: 'edicion' },
    ],
    trabajo: [
        { label: 'Aplicaciones de oficina', key: 'oficina' },
        { label: 'Multitarea', key: 'multitarea' },
        { label: 'Seguridad', key: 'seguridad' },
    ],
    redes: [
        { label: 'Fluidez en apps sociales', key: 'fluidez' },
        { label: 'Carga de imágenes y videos', key: 'carga' },
        { label: 'Notificaciones y multitarea', key: 'notificaciones' },
    ],
    otro: [
        { label: 'Duración de batería', key: 'bateria' },
        { label: 'Facilidad de uso', key: 'facilidad' },
        { label: 'Almacenamiento', key: 'almacenamiento' },
    ],
    };

    const sliders = slidersPorUso[uso as string] || [];

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Indica la importancia para este uso:</Text>
        {sliders.map((item) => (
        <View key={item.key} style={styles.sliderGroup}>
            <Text style={styles.label}>{item.label}</Text>
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
            <Text style={styles.label}>[Control no disponible en versión web]</Text>
            )}
        </View>
        ))}

        <Pressable style={styles.button} onPress={continuar}>
        <Text style={styles.buttonText}>Continuar</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20, textAlign: 'center' },
    sliderGroup: { marginBottom: 30 },
    label: { fontSize: 16, color: '#333', marginBottom: 5 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 20 },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
