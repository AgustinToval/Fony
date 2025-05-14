    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Preferencias() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();
    const { settings } = useAppSettings();

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

        router.push('/sugerencias');
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const labelColor = isDark ? '#ccc' : '#333';
    const titleFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>¿Prefieres una marca específica?</Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarMarca(true)} style={usarMarca ? styles.selected : styles.option}>
            <Text style={{ color: usarMarca ? '#fff' : labelColor }}>Sí</Text>
            </Pressable>
            <Pressable onPress={() => setUsarMarca(false)} style={!usarMarca ? styles.selected : styles.option}>
            <Text style={{ color: !usarMarca ? '#fff' : labelColor }}>No</Text>
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

        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>¿Prefieres un color específico?</Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarColor(true)} style={usarColor ? styles.selected : styles.option}>
            <Text style={{ color: usarColor ? '#fff' : labelColor }}>Sí</Text>
            </Pressable>
            <Pressable onPress={() => setUsarColor(false)} style={!usarColor ? styles.selected : styles.option}>
            <Text style={{ color: !usarColor ? '#fff' : labelColor }}>No</Text>
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

        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>¿Prefieres un tamaño específico?</Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarTamano(true)} style={usarTamano ? styles.selected : styles.option}>
            <Text style={{ color: usarTamano ? '#fff' : labelColor }}>Sí</Text>
            </Pressable>
            <Pressable onPress={() => setUsarTamano(false)} style={!usarTamano ? styles.selected : styles.option}>
            <Text style={{ color: !usarTamano ? '#fff' : labelColor }}>No</Text>
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
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>Ver resultado</Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 30 },
    title: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    selector: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    option: { backgroundColor: '#eee', padding: 10, borderRadius: 8 },
    selected: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 40 },
    buttonText: { color: '#fff', textAlign: 'center' },
    });
