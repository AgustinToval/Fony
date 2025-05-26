    import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getCelulares } from '@/utils/api';
import { getFontSize } from '@/utils/getFontSize';
import { getImage } from '@/utils/getImage';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

    export default function Resultado() {
    const { preferencias } = useUserPreferences();
    const { settings } = useAppSettings();
    const lang = settings.idioma;
    const router = useRouter();

    const [modelo, setModelo] = useState<any>(null);

    useEffect(() => {
        getCelulares().then((data) => {
        const encontrado = data.find((cel: any) => cel.nombre === preferencias.movilElegido);
        setModelo(encontrado);
        });
    }, [preferencias.movilElegido]);

    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla && modelo) {
            speak(`${modelo.nombre}`, settings);
        }
        return () => Speech.stop();
        }, [modelo, settings])
    );

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const secondaryText = isDark ? '#ccc' : '#444';
    const specColor = isDark ? '#ccc' : '#333';

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const bodyFont = getFontSize('small', settings.tamanioLetra);
    const simbolo = settings.moneda === 'EUR' ? '€' : 'US$';

    const convertirPrecio = (precioUSD: number) =>
        settings.moneda === 'EUR' ? Math.round(precioUSD * 0.92) : precioUSD;

    if (!modelo) {
        return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <Text style={[styles.title, { color: textColor }]}>
            {t('resultado.noEncontrado', lang)}
            </Text>
        </View>
        );
    }

    const guardarFavorito = async () => {
        try {
        const almacenados = await AsyncStorage.getItem('favoritos');
        const favoritos = almacenados ? JSON.parse(almacenados) : [];
        const yaExiste = favoritos.some((item: any) => item.id === modelo.id);
        if (!yaExiste) {
            favoritos.push(modelo);
            await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
            Alert.alert(t('resultado.agregado', lang));
        } else {
            Alert.alert(t('resultado.yaExiste', lang));
        }
        } catch (error) {
        console.error('Error al guardar en favoritos:', error);
        Alert.alert(t('resultado.error', lang));
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { fontSize: titleFont, color: textColor }]}>{modelo.nombre}</Text>
        <Image source={getImage(modelo.id)} style={styles.image} />
        <Text style={[styles.summary, { fontSize: bodyFont, color: secondaryText }]}>
            {modelo.resumen}
        </Text>

        <Text style={[styles.sectionTitle, { fontSize: subtitleFont, color: textColor }]}>
            {t('resultado.enlaces', lang)}
        </Text>
        {modelo.linksCompra &&
            Object.entries(modelo.linksCompra).map(([tienda, url]) =>
            url ? (
                <Pressable key={tienda} style={styles.button} onPress={() => Linking.openURL(String(url))}>
                <Text style={[styles.buttonText, { fontSize: bodyFont }]}>
                    {t('resultado.verEn', lang)} {tienda}
                </Text>
                </Pressable>
            ) : null
            )}

        <Text style={[styles.sectionTitle, { fontSize: subtitleFont, color: textColor }]}>
            {t('resultado.especificaciones', lang)}
        </Text>
        <Text style={[styles.spec, { color: specColor }]}>{t('resultado.marca', lang)}: {modelo.marca}</Text>
        <Text style={[styles.spec, { color: specColor }]}>
            {t('resultado.precio', lang)}: {simbolo}{convertirPrecio(modelo.precio)}
        </Text>
        <Text style={[styles.spec, { color: specColor }]}>{t('resultado.colores', lang)}: {modelo.color.join(', ')}</Text>
        <Text style={[styles.spec, { color: specColor }]}>{t('resultado.tamano', lang)}: {modelo.tamano}</Text>
        <Text style={[styles.spec, { color: specColor }]}>
            {t('resultado.usoIdeal', lang)}: {modelo.usoIdeal.join(', ')}
        </Text>

        <Pressable style={styles.favButton} onPress={guardarFavorito}>
            <Text style={[styles.buttonText, { fontSize: bodyFont }]}>
            {t('resultado.favorito', lang)}
            </Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => router.replace('/home')}>
            <Text style={[styles.buttonText, { fontSize: bodyFont }]}>
            {t('resultado.volver', lang)}
            </Text>
        </Pressable>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    summary: { marginBottom: 20, textAlign: 'center' },
    sectionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    image: { width: 180, height: 180, resizeMode: 'contain', marginBottom: 15 },
    button: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, marginBottom: 10, width: '80%' },
    favButton: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, marginTop: 20, width: '80%' },
    backButton: { backgroundColor: '#1e40af', padding: 12, borderRadius: 8, marginTop: 10, width: '80%' },
    buttonText: { color: '#fff', textAlign: 'center' },
    spec: { fontSize: 15, marginBottom: 5, textAlign: 'center' },
    });
