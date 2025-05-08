import { useUserPreferences } from '@/context/UserPreferencesContext';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Disponibilidad() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();

  const [monto, setMonto] = useState(500); // valor inicial (en dólares o tu moneda)

    const continuar = () => {
    setPreferencias({
        ...preferencias,
        presupuesto: monto,
    });
    router.push('/preferencias'); // siguiente paso después del presupuesto
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>¿Cuál es tu presupuesto estimado?</Text>

        {Platform.OS !== 'web' ? (
        <>
            <Text style={styles.amount}>€{monto}</Text>
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
        <Text style={styles.warning}>[Control no disponible en la versión web]</Text>
        )}

        <Pressable style={styles.button} onPress={continuar}>
        <Text style={styles.buttonText}>Continuar</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#fff', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20, textAlign: 'center' },
    amount: { fontSize: 20, color: '#2563eb', textAlign: 'center', marginBottom: 10 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 30 },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
    warning: { textAlign: 'center', color: '#888', marginVertical: 20 },
});
