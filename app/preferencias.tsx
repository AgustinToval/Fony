    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

    const [modal, setModal] = useState<'marca' | 'color' | 'tamano' | null>(null);

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
    const modalBg = isDark ? '#222' : '#fff';

    const titleFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    const opciones = {
        marca: [
        { label: 'Samsung', value: 'Samsung' },
        { label: 'Motorola', value: 'Motorola' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Xiaomi', value: 'Xiaomi' },
        { label: 'Otra', value: 'otra' },
        ],
        color: [
        { label: 'Negro', value: 'Negro' },
        { label: 'Blanco', value: 'Blanco' },
        { label: 'Plateado', value: 'Plateado' },
        { label: 'Dorado', value: 'Dorado' },
        { label: 'Otro', value: 'otro' },
        ],
        tamano: [
        { label: 'Pequeño (menos de 6”)', value: 'pequeno' },
        { label: 'Mediano (6 a 6.5”)', value: 'mediano' },
        { label: 'Grande (más de 6.5”)', value: 'grande' },
        ],
    };

    const renderModal = (
        tipo: 'marca' | 'color' | 'tamano',
        selected: string,
        setter: (v: string) => void
    ) => (
        <Modal transparent animationType="fade" visible={modal === tipo}>
        <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: modalBg }]}>
            {opciones[tipo].map((op) => (
                <Pressable
                key={op.value}
                onPress={() => {
                    setter(op.value);
                    setModal(null);
                }}
                style={styles.modalOption}
                >
                <Text style={{ color: textColor }}>{op.label}</Text>
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
        <ScrollView style={{ backgroundColor: bgColor }} contentContainerStyle={styles.container}>
        {/* Marca */}
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
            <>
            <Pressable style={styles.selectBox} onPress={() => setModal('marca')}>
                <Text style={{ color: textColor }}>{marcaDeseada}</Text>
            </Pressable>
            {renderModal('marca', marcaDeseada, setMarcaDeseada)}
            </>
        )}

        {/* Color */}
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
            <>
            <Pressable style={styles.selectBox} onPress={() => setModal('color')}>
                <Text style={{ color: textColor }}>{colorDeseado}</Text>
            </Pressable>
            {renderModal('color', colorDeseado, setColorDeseado)}
            </>
        )}

        {/* Tamaño */}
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
            <>
            <Pressable style={styles.selectBox} onPress={() => setModal('tamano')}>
                <Text style={{ color: textColor }}>{tamanoDeseado}</Text>
            </Pressable>
            {renderModal('tamano', tamanoDeseado, setTamanoDeseado)}
            </>
        )}

        {/* Botón */}
        <Pressable style={styles.button} onPress={continuar}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>Ver resultado</Text>
        </Pressable>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 30 },
    title: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    selector: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    option: { backgroundColor: '#eee', padding: 10, borderRadius: 8 },
    selected: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8 },
    selectBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginTop: 40 },
    buttonText: { color: '#fff', textAlign: 'center' },
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
    });
