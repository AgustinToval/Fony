    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
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
        { label: t('configuracion.tamanio.pequeno', settings.idioma), value: 'pequeno' },
        { label: t('configuracion.tamanio.normal', settings.idioma), value: 'normal' },
        { label: t('configuracion.tamanio.grande', settings.idioma), value: 'grande' },
        ],
        idioma: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
        ],
        moneda: [
        { label: 'USD (Dólares)', value: 'USD' },
        { label: 'EUR (Euros)', value: 'EUR' },
        ],
    };

    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            speak(t('configuracion.titulo', settings.idioma), settings);
        }
        }, [settings])
    );

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
                    speak(t(`configuracion.feedback.tamanio.${op.value}`, settings.idioma), settings);
                    } else if (tipo === 'idioma') {
                    const nuevoIdioma = op.value as 'es' | 'en';
                    actualizar({ idioma: nuevoIdioma });
                    speak(t(`configuracion.feedback.idioma.${nuevoIdioma}`, nuevoIdioma), {
                        ...settings,
                        idioma: nuevoIdioma,
                    });
                    } else if (tipo === 'moneda') {
                    actualizar({ moneda: op.value as typeof settings.moneda });
                    speak(t(`configuracion.feedback.moneda.${op.value}`, settings.idioma), settings);
                    }
                    setModal(null);
                }}
                style={styles.modalOption}
                >
                <Text style={{ color: textColor, fontSize: labelFont }}>{op.label}</Text>
                </Pressable>
            ))}
            <Pressable onPress={() => setModal(null)} style={styles.modalCancel}>
                <Text style={{ color: '#dc2626' }}>{t('configuracion.cancelar', settings.idioma)}</Text>
            </Pressable>
            </View>
        </View>
        </Modal>
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: getFontSize('large', settings.tamanioLetra) }]}>
            {t('configuracion.titulo', settings.idioma)}
        </Text>

        {/* Modo oscuro */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>
            {t('configuracion.modoOscuro', settings.idioma)}
            </Text>
            <Switch
            value={settings.modoOscuro}
            onValueChange={(v) => {
                setSettings({ modoOscuro: v });
                const msgKey = v ? 'modoOscuroOn' : 'modoOscuroOff';
                speak(t(`configuracion.feedback.${msgKey}`, settings.idioma), settings);
            }}
            style={styles.switch}
            />
        </View>
        <View style={styles.divider} />

        {/* Tamaño de letra */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>
            {t('configuracion.tamanoLetra', settings.idioma)}
            </Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => {
                setModal('tamanio');
                speak(t('configuracion.lectorLabel.tamanoLetra', settings.idioma), settings);
            }}
            >
            <Text style={{ color: textColor, fontSize: pickerFont }}>
                {opciones.tamanio.find((o) => o.value === settings.tamanioLetra)?.label}
            </Text>
            </Pressable>
            {renderModal('tamanio')}
        </View>
        <View style={styles.divider} />

        {/* Lector en voz alta */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>
            {t('configuracion.lector', settings.idioma)}
            </Text>
            <Switch
            value={settings.lectorPantalla}
            onValueChange={(v) => {
                const msgKey = v ? 'lectorOn' : 'lectorOff';
                const mensaje = t(`configuracion.feedback.${msgKey}`, settings.idioma);
                setSettings({ lectorPantalla: v });
                setTimeout(() => {
                speak(mensaje, { ...settings, lectorPantalla: v });
                }, 100);
            }}
            />
        </View>
        <View style={styles.divider} />

        {/* Idioma */}
        <View style={styles.setting}>
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>
            {t('configuracion.idioma', settings.idioma)}
            </Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => {
                setModal('idioma');
                speak(t('configuracion.lectorLabel.idioma', settings.idioma), settings);
            }}
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
            <Text style={[styles.label, { color: textColor, fontSize: labelFont }]}>
            {t('configuracion.moneda', settings.idioma)}
            </Text>
            <Pressable
            style={[styles.selector, { backgroundColor: isDark ? '#222' : '#f0f0f0' }]}
            onPress={() => {
                setModal('moneda');
                speak(t('configuracion.lectorLabel.moneda', settings.idioma), settings);
            }}
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
