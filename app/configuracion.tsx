    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

    export default function Configuracion() {
    const { settings, setSettings } = useAppSettings();

    const actualizar = (cambio: Partial<typeof settings>) => {
        setSettings(cambio);
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';

    const fontSize = getFontSize('medium', settings.tamanioLetra);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor }]}>Configuración</Text>

        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor }]}>🌙 Modo oscuro</Text>
            <Switch value={settings.modoOscuro} onValueChange={(v) => actualizar({ modoOscuro: v })} />
        </View>

        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor }]}>🔠 Tamaño de letra</Text>
            <Picker
            selectedValue={settings.tamanioLetra}
            onValueChange={(value) => actualizar({ tamanioLetra: value })}
            >
            <Picker.Item label="Pequeño" value="pequeno" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Grande" value="grande" />
            </Picker>
        </View>

        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor }]}>🧏‍♂️ Lector para ciegos</Text>
            <Switch value={settings.lectorPantalla} onValueChange={(v) => actualizar({ lectorPantalla: v })} />
        </View>

        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor }]}>🌐 Idioma</Text>
            <Picker
            selectedValue={settings.idioma}
            onValueChange={(value) => actualizar({ idioma: value })}
            >
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Inglés" value="en" />
            <Picker.Item label="Italiano" value="it" />
            <Picker.Item label="Alemán" value="de" />
            <Picker.Item label="Francés" value="fr" />
            </Picker>
        </View>

        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor }]}>💱 Moneda</Text>
            <Picker
            selectedValue={settings.moneda}
            onValueChange={(value) => actualizar({ moneda: value })}
            >
            <Picker.Item label="USD (Dólares)" value="USD" />
            <Picker.Item label="EUR (Euros)" value="EUR" />
            </Picker>
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    setting: { marginBottom: 25 },
    label: { fontSize: 16, marginBottom: 5 },
    });
