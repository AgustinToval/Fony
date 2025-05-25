    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
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
    const lang = settings.idioma;

    const [marcaDeseada, setMarcaDeseada] = useState('ninguna');
    const [colorDeseado, setColorDeseado] = useState('ninguno');
    const [tamanoDeseado, setTamanoDeseado] = useState('ninguno');

    const [usarMarca, setUsarMarca] = useState(false);
    const [usarColor, setUsarColor] = useState(false);
    const [usarTamano, setUsarTamano] = useState(false);

    const [modal, setModal] = useState<'marca' | 'color' | 'tamano' | null>(null);

    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            const intro =
            lang === 'es'
                ? 'Selecciona si tienes alguna preferencia de marca, color o tamaño.'
                : 'Choose if you have a preference for brand, color, or size.';
            speak(`${t('preferencias.pregMarca', lang)}. ${intro}`, settings);
        }
        }, [settings])
    );

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
        { label: t('preferencias.otra', lang), value: 'otra' },
        ],
        color: [
        { label: t('preferencias.negro', lang), value: 'Negro' },
        { label: t('preferencias.blanco', lang), value: 'Blanco' },
        { label: t('preferencias.plateado', lang), value: 'Plateado' },
        { label: t('preferencias.dorado', lang), value: 'Dorado' },
        { label: t('preferencias.otro', lang), value: 'otro' },
        ],
        tamano: [
        { label: t('preferencias.pequeno', lang), value: 'pequeno' },
        { label: t('preferencias.mediano', lang), value: 'mediano' },
        { label: t('preferencias.grande', lang), value: 'grande' },
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
                    if (settings.lectorPantalla) speak(op.label, settings);
                }}
                style={styles.modalOption}
                >
                <Text style={{ color: textColor }}>{op.label}</Text>
                </Pressable>
            ))}
            <Pressable onPress={() => setModal(null)} style={styles.modalCancel}>
                <Text style={{ color: '#dc2626' }}>{t('configuracion.cancelar', lang)}</Text>
            </Pressable>
            </View>
        </View>
        </Modal>
    );

    return (
        <ScrollView style={{ backgroundColor: bgColor }} contentContainerStyle={styles.container}>
        {/* Marca */}
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('preferencias.pregMarca', lang)}
        </Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarMarca(true)} style={usarMarca ? styles.selected : styles.option}>
            <Text style={{ color: usarMarca ? '#fff' : labelColor }}>{t('preferencias.si', lang)}</Text>
            </Pressable>
            <Pressable onPress={() => setUsarMarca(false)} style={!usarMarca ? styles.selected : styles.option}>
            <Text style={{ color: !usarMarca ? '#fff' : labelColor }}>{t('preferencias.no', lang)}</Text>
            </Pressable>
        </View>
        {usarMarca && (
            <>
            <Pressable style={styles.selectBox} onPress={() => {
                setModal('marca');
                if (settings.lectorPantalla) speak(t('preferencias.pregMarca', lang), settings);
            }}>
                <Text style={{ color: textColor }}>{marcaDeseada}</Text>
            </Pressable>
            {renderModal('marca', marcaDeseada, setMarcaDeseada)}
            </>
        )}

        {/* Color */}
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('preferencias.pregColor', lang)}
        </Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarColor(true)} style={usarColor ? styles.selected : styles.option}>
            <Text style={{ color: usarColor ? '#fff' : labelColor }}>{t('preferencias.si', lang)}</Text>
            </Pressable>
            <Pressable onPress={() => setUsarColor(false)} style={!usarColor ? styles.selected : styles.option}>
            <Text style={{ color: !usarColor ? '#fff' : labelColor }}>{t('preferencias.no', lang)}</Text>
            </Pressable>
        </View>
        {usarColor && (
            <>
            <Pressable style={styles.selectBox} onPress={() => {
                setModal('color');
                if (settings.lectorPantalla) speak(t('preferencias.pregColor', lang), settings);
            }}>
                <Text style={{ color: textColor }}>{colorDeseado}</Text>
            </Pressable>
            {renderModal('color', colorDeseado, setColorDeseado)}
            </>
        )}

        {/* Tamaño */}
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('preferencias.pregTamano', lang)}
        </Text>
        <View style={styles.selector}>
            <Pressable onPress={() => setUsarTamano(true)} style={usarTamano ? styles.selected : styles.option}>
            <Text style={{ color: usarTamano ? '#fff' : labelColor }}>{t('preferencias.si', lang)}</Text>
            </Pressable>
            <Pressable onPress={() => setUsarTamano(false)} style={!usarTamano ? styles.selected : styles.option}>
            <Text style={{ color: !usarTamano ? '#fff' : labelColor }}>{t('preferencias.no', lang)}</Text>
            </Pressable>
        </View>
        {usarTamano && (
            <>
            <Pressable style={styles.selectBox} onPress={() => {
                setModal('tamano');
                if (settings.lectorPantalla) speak(t('preferencias.pregTamano', lang), settings);
            }}>
                <Text style={{ color: textColor }}>{tamanoDeseado}</Text>
            </Pressable>
            {renderModal('tamano', tamanoDeseado, setTamanoDeseado)}
            </>
        )}

        {/* Botón */}
        <Pressable style={styles.button} onPress={continuar}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>{t('preferencias.verResultado', lang)}</Text>
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
