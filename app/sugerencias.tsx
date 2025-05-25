import celularesData from '@/assets/data/celulares.json';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { getImage } from '@/utils/getImage';
import { t } from '@/utils/i18n';
import { speak, stopSpeech } from '@/utils/speak';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';


    type Celular = {
    id: string;
    nombre: string;
    marca: string;
    precio: number;
    usoIdeal: string[];
    color: string[];
    tamano: string;
    resumen: string;
    idImagen?: string;
    linksCompra?: { [key: string]: string };
    etiquetas?: { [key: string]: number };
    };

    export default function Sugerencias() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();
    const { settings } = useAppSettings();
    const lang = settings.idioma;

    const [sugeridos, setSugeridos] = useState<Celular[]>([]);
    const [usoFiltroFlexible, setUsoFiltroFlexible] = useState(false);
    const [sinCoincidencias, setSinCoincidencias] = useState(false);

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const subTextColor = isDark ? '#bbb' : '#444';
    const cardColor = isDark ? '#1e1e1e' : '#f9f9f9';

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const smallFont = getFontSize('small', settings.tamanioLetra);

    useFocusEffect(
        useCallback(() => {
        if (settings.lectorPantalla) {
            speak(
            `${t('sugerencias.titulo', lang)}. ${t('sugerencias.subtitulo', lang)}`,
            settings
            );
        }
        }, [settings.lectorPantalla, lang])
    );

    const normalizarUso = (u: string) =>
        ['multimedia', 'fotografia', 'video'].includes(u.toLowerCase()) ? 'multimedia' :
        ['gaming', 'juegos'].includes(u.toLowerCase()) ? 'gaming' :
        ['trabajo', 'oficina', 'productividad'].includes(u.toLowerCase()) ? 'trabajo' :
        ['redes', 'sociales'].includes(u.toLowerCase()) ? 'redes' :
        ['otro', 'general'].includes(u.toLowerCase()) ? 'otro' :
        u.toLowerCase();

    const calcularPuntaje = (cel: Celular): number => {
        if (!preferencias.sliders || !cel.etiquetas) return 0;
        return Object.entries(preferencias.sliders).reduce((total, [subuso, importancia]) => {
        const valor = cel.etiquetas?.[subuso] ?? 0;
        return total + (valor * importancia);
        }, 0);
    };

    useEffect(() => {
        const usoPreferido = normalizarUso(preferencias.uso || '');
        const celulares: Celular[] = celularesData as unknown as Celular[];

        let resultados = celulares.filter((cel) => {
        const coincidePresupuesto = cel.precio <= (preferencias.presupuesto ?? Infinity);
        const coincideUso = cel.usoIdeal.map((u) => u.toLowerCase()).includes(usoPreferido);
        const coincideMarca =
            preferencias.marcaPreferida === 'ninguna' ||
            cel.marca.toLowerCase() === (preferencias.marcaPreferida?.toLowerCase() ?? '');
        const coincideColor =
            preferencias.colorPreferido === 'ninguno' ||
            cel.color.some((c) =>
            c.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '') ===
            preferencias.colorPreferido?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '')
            );
        const coincideTamano =
            preferencias.tamanoPreferido === 'ninguno' ||
            cel.tamano.toLowerCase() === (preferencias.tamanoPreferido?.toLowerCase() ?? '');

        return coincidePresupuesto && coincideUso && coincideMarca && coincideColor && coincideTamano;
        });

        if (resultados.length > 0) {
        const conPuntaje = resultados
            .map((cel) => ({ ...cel, puntaje: calcularPuntaje(cel) }))
            .sort((a, b) => (b.puntaje ?? 0) - (a.puntaje ?? 0));
        setUsoFiltroFlexible(false);
        setSinCoincidencias(false);
        setSugeridos(conPuntaje.slice(0, 3));
        return;
        }

        resultados = celulares.filter((cel) => {
        const coincidePresupuesto = cel.precio <= (preferencias.presupuesto ?? Infinity);
        const coincideUso = cel.usoIdeal.map((u) => u.toLowerCase()).includes(usoPreferido);
        return coincidePresupuesto && coincideUso;
        });

        if (resultados.length > 0) {
        const conPuntaje = resultados
            .map((cel) => ({ ...cel, puntaje: calcularPuntaje(cel) }))
            .sort((a, b) => (b.puntaje ?? 0) - (a.puntaje ?? 0));
        setUsoFiltroFlexible(true);
        setSinCoincidencias(false);
        setSugeridos(conPuntaje.slice(0, 3));
        return;
        }

        setUsoFiltroFlexible(true);
        setSinCoincidencias(true);
        setSugeridos(celulares.slice(0, 3));
    }, [preferencias]);

    const elegirMovil = (movil: string) => {
    stopSpeech();
    setPreferencias({ ...preferencias, movilElegido: movil });
    router.push('/resultado');
    };


    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('sugerencias.titulo', lang)}
        </Text>
        <Text style={[styles.subtitle, { color: subTextColor, fontSize: subtitleFont }]}>
            {t('sugerencias.subtitulo', lang)}
        </Text>

        {usoFiltroFlexible && !sinCoincidencias && (
            <Text style={[styles.warning, { fontSize: smallFont }]}>
            {t('sugerencias.filtroFlexible', lang)}
            </Text>
        )}

        {sinCoincidencias && (
            <Text style={[styles.warning, { fontSize: smallFont }]}>
            {t('sugerencias.sinCoincidencias', lang)}
            </Text>
        )}

        {sugeridos.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: cardColor }]}>
            <Image source={getImage(item.id)} style={styles.image} />
            <Text style={[styles.name, { color: textColor, fontSize: subtitleFont }]}>
                {item.nombre}
            </Text>
            <Text style={[styles.summary, { color: subTextColor, fontSize: smallFont }]}>
                {item.resumen}
            </Text>
            <Pressable style={styles.button} onPress={() => elegirMovil(item.nombre)}>
                <Text style={styles.buttonText}>{t('sugerencias.verDetalles', lang)}</Text>
            </Pressable>
            </View>
        ))}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
    subtitle: { marginBottom: 20, textAlign: 'center' },
    warning: { textAlign: 'center', color: '#e11d48', marginBottom: 15 },
    card: { borderRadius: 10, padding: 15, marginBottom: 20, alignItems: 'center' },
    image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
    name: { fontWeight: 'bold', marginBottom: 5 },
    summary: { textAlign: 'center', marginBottom: 10 },
    button: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 14 },
    });
