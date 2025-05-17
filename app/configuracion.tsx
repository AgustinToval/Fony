    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

    export default function Configuracion() {
    const { settings, setSettings } = useAppSettings();
    const [modal, setModal] = useState<'tamanio' | 'idioma' | 'moneda' | null>(null);

    const actualizar = (cambio: Partial<typeof settings>) => {
        setSettings(cambio);
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';

    const labelFont = getFontSize('medium', settings.tamanioLetra);
    const pickerFont = getFontSize('small', settings.tamanioLetra);

    const opciones = {
        tamanio: [
        { label: 'Pequeño', value: 'pequeno' },
        { label: 'Normal', value: 'normal' },
        { label: 'Grande', value: 'grande' },
        ],
        idioma: [
        { label: 'Español', value: 'es' },
        { label: 'Inglés', value: 'en' },
        { label: 'Italiano', value: 'it' },
        { label: 'Alemán', value: 'de' },
        { label: 'Francés', value: 'fr' },
        ],
        moneda: [
        { label: 'USD (Dólares)', value: 'USD' },
        { label: 'EUR (Euros)', value: 'EUR' },
        ],
    };

    const renderModal = (tipo: 'tamanio' | 'idioma' | 'moneda') => (
        <Modal transparent animationType="fade" visible={modal === tipo}>
        <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
            {opciones[tipo].map((op) => (
                <Pressable
                key={op.value}
                onPress={() => {
                    if (tipo === 'tamanio') {
                    actualizar({ tamanioLetra: op.value as typeof settings.tamanioLetra });
                    } else if (tipo === 'idioma') {
                    actualizar({ idioma: op.value as typeof settings.idioma });
                    } else if (tipo === 'moneda') {
                    actualizar({ moneda: op.value as typeof settings.moneda });
                    }
                    setModal(null);
                }}
                style={styles.modalOption}
                >
                <Text style={{ color: textColor, fontSize: labelFont }}>{op.label}</Text>
                </Pressable>
            ))}
            <Pressable onPress={() => setModal(null)} style={styles.modalCancel}>
                <Text style={{ color: '#dc2626' }}>Cancelar</Text>
            </Pressable>
            </View>
        </View>
        </Modal>
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: getFontSize('large', settings.tamanioLetra) }]}>
            Configuración
        </Text>

        {/* Modo oscuro */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>🌙 Modo oscuro</Text>
            <Switch
            value={settings.modoOscuro}
            onValueChange={(v) => setSettings({ modoOscuro: v })}
            style={styles.switch}
            />
        </View>
        <View style={styles.divider} />

        {/* Tamaño de letra */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>🔠 Tamaño de letra</Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => setModal('tamanio')}
            >
            <Text style={{ color: textColor, fontSize: pickerFont }}>
                {opciones.tamanio.find((o) => o.value === settings.tamanioLetra)?.label}
            </Text>
            </Pressable>
            {renderModal('tamanio')}
        </View>
        <View style={styles.divider} />

        {/* Lector para ciegos */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>🧏‍♂️ Lector para ciegos</Text>
            <Switch
            value={settings.lectorPantalla}
            onValueChange={(v) => setSettings({ lectorPantalla: v })}
            style={styles.switch}
            />
        </View>
        <View style={styles.divider} />

        {/* Idioma */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>🌐 Idioma</Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => setModal('idioma')}
            >
            <Text style={{ color: textColor, fontSize: pickerFont }}>
                {opciones.idioma.find((o) => o.value === settings.idioma)?.label}
            </Text>
            </Pressable>
            {renderModal('idioma')}
        </View>
        <View style={styles.divider} />

        {/* Moneda */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>💱 Moneda</Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => setModal('moneda')}
            >
            <Text style={{ color: textColor, fontSize: pickerFont }}>
                {opciones.moneda.find((o) => o.value === settings.moneda)?.label}
            </Text>
            </Pressable>
            {renderModal('moneda')}
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    setting: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: { flex: 1 },
    selector: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        width: '50%',
    },
    switch: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        padding: 30,
    },
    modalContent: {
        borderRadius: 10,
        padding: 20,
    },
    modalOption: {
        paddingVertical: 10,
    },
    modalCancel: {
        marginTop: 15,
        alignItems: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginBottom: 15,
    },
    });
