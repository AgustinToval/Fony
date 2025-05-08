import { useUserPreferences } from '@/context/UserPreferencesContext';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Preferencias() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();

    const [marcaDeseada, setMarcaDeseada] = useState('ninguna');
    const [colorDeseado, setColorDeseado] = useState('ninguno');
    const [tamanoDeseado, setTamanoDeseado] = useState('ninguno');

    const [usarMarca, setUsarMarca] = useState(false);
    const [usarColor, setUsarColor] = useState(false);
    const [usarTamano, setUsarTamano] = useState(false);

    const continuar = () => {
    setPreferencias({
        ...preferencias,
        marcaPreferida: usarMarca ? marcaDeseada : 'ninguna',
        colorPreferido: usarColor ? colorDeseado : 'ninguno',
        tamanoPreferido: usarTamano ? tamanoDeseado : 'ninguno',
    });

    router.push({ pathname: 'sugerencias' as any});
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>¿Preferís una marca específica?</Text>
        <View style={styles.selector}>
        <Pressable onPress={() => setUsarMarca(true)} style={usarMarca ? styles.selected : styles.option}>
            <Text>Sí</Text>
        </Pressable>
        <Pressable onPress={() => setUsarMarca(false)} style={!usarMarca ? styles.selected : styles.option}>
            <Text>No</Text>
        </Pressable>
        </View>

        {usarMarca && (
        <Picker selectedValue={marcaDeseada} onValueChange={(v) => setMarcaDeseada(v)}>
            <Picker.Item label="Samsung" value="Samsung" />
            <Picker.Item label="Motorola" value="Motorola" />
            <Picker.Item label="Apple" value="Apple" />
            <Picker.Item label="Xiaomi" value="Xiaomi" />
            <Picker.Item label="Otra" value="otra" />
        </Picker>
        )}

        <Text style={styles.title}>¿Preferís un color específico?</Text>
        <View style={styles.selector}>
        <Pressable onPress={() => setUsarColor(true)} style={usarColor ? styles.selected : styles.option}>
            <Text>Sí</Text>
        </Pressable>
        <Pressable onPress={() => setUsarColor(false)} style={!usarColor ? styles.selected : styles.option}>
            <Text>No</Text>
        </Pressable>
        </View>

        {usarColor && (
        <Picker selectedValue={colorDeseado} onValueChange={(v) => setColorDeseado(v)}>
            <Picker.Item label="Negro" value="Negro" />
            <Picker.Item label="Blanco" value="Blanco" />
            <Picker.Item label="Plateado" value="Plateado" />
            <Picker.Item label="Dorado" value="Dorado" />
            <Picker.Item label="Otro" value="otro" />
        </Picker>
        )}

        <Text style={styles.title}>¿Preferís un tamaño específico?</Text>
        <View style={styles.selector}>
        <Pressable onPress={() => setUsarTamano(true)} style={usarTamano ? styles.selected : styles.option}>
            <Text>Sí</Text>
        </Pressable>
        <Pressable onPress={() => setUsarTamano(false)} style={!usarTamano ? styles.selected : styles.option}>
            <Text>No</Text>
        </Pressable>
        </View>

        {usarTamano && (
        <Picker selectedValue={tamanoDeseado} onValueChange={(v) => setTamanoDeseado(v)}>
            <Picker.Item label="Pequeño (menos de 6”)" value="pequeno" />
            <Picker.Item label="Mediano (6 a 6.5”)" value="mediano" />
            <Picker.Item label="Grande (más de 6.5”)" value="grande" />
        </Picker>
        )}

        <Pressable style={styles.button} onPress={continuar}>
        <Text style={styles.buttonText}>Ver resultado</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    selector: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    option: { backgroundColor: '#eee', padding: 10, borderRadius: 8 },
    selected: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, color: '#fff' },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 40 },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
