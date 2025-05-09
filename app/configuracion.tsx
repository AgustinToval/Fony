    import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

    type Config = {
    modoOscuro: boolean;
    tamanioLetra: 'pequeno' | 'normal' | 'grande';
    lectorPantalla: boolean;
    idioma: 'es' | 'en' | 'it' | 'de' | 'fr';
    moneda: 'USD' | 'EUR';
    };

    export default function Configuracion() {
    const [config, setConfig] = useState<Config>({
        modoOscuro: false,
        tamanioLetra: 'normal',
        lectorPantalla: false,
        idioma: 'es',
        moneda: 'USD',
    });

    useEffect(() => {
        const cargarConfig = async () => {
        const json = await AsyncStorage.getItem('config');
        if (json) setConfig(JSON.parse(json));
        };
        cargarConfig();
    }, []);

    const actualizarConfig = async (nueva: Partial<Config>) => {
        const actualizada = { ...config, ...nueva };
        setConfig(actualizada);
        await AsyncStorage.setItem('config', JSON.stringify(actualizada));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configuración</Text>

        <View style={styles.setting}>
            <Text style={styles.label}>🌙 Modo oscuro</Text>
            <Switch value={config.modoOscuro} onValueChange={(v) => actualizarConfig({ modoOscuro: v })} />
        </View>

        <View style={styles.setting}>
            <Text style={styles.label}>🔠 Tamaño de letra</Text>
            <Picker
            selectedValue={config.tamanioLetra}
            onValueChange={(value) => actualizarConfig({ tamanioLetra: value })}
            >
            <Picker.Item label="Pequeño" value="pequeno" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Grande" value="grande" />
            </Picker>
        </View>

        <View style={styles.setting}>
            <Text style={styles.label}>🧏‍♂️ Lector para ciegos</Text>
            <Switch value={config.lectorPantalla} onValueChange={(v) => actualizarConfig({ lectorPantalla: v })} />
        </View>

        <View style={styles.setting}>
            <Text style={styles.label}>🌐 Idioma</Text>
            <Picker
            selectedValue={config.idioma}
            onValueChange={(value) => actualizarConfig({ idioma: value })}
            >
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Inglés" value="en" />
            <Picker.Item label="Italiano" value="it" />
            <Picker.Item label="Alemán" value="de" />
            <Picker.Item label="Francés" value="fr" />
            </Picker>
        </View>

        <View style={styles.setting}>
            <Text style={styles.label}>💱 Moneda</Text>
            <Picker
            selectedValue={config.moneda}
            onValueChange={(value) => actualizarConfig({ moneda: value })}
            >
            <Picker.Item label="USD (Dólares)" value="USD" />
            <Picker.Item label="EUR (Euros)" value="EUR" />
            </Picker>
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 20, textAlign: 'center' },
    setting: { marginBottom: 25 },
    label: { fontSize: 16, color: '#333', marginBottom: 5 },
    });
