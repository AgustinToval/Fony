    import celularesData from '@/assets/data/celulares.json';
import { useUserPreferences } from '@/context/UserPreferencesContext';
import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

    const getImage = (filename: string) => {
    switch (filename) {
        case 's23': return require('@/assets/images/s23.png');
        case 'iphone13': return require('@/assets/images/iphone13.png');
        case 'motoe32': return require('@/assets/images/motoe32.png');
        case 'redminote12': return require('@/assets/images/redminote12.png');
        case 'a14': return require('@/assets/images/a14.png');
        case 'xiaomi13': return require('@/assets/images/xiaomi13.png');
        default: return require('@/assets/images/default.png');
    }
    };

    type Celular = {
    id: string;
    nombre: string;
    marca: string;
    precio: number;
    usoIdeal: string[];
    color: string[];
    tamano: string;
    resumen: string;
    linksCompra?: { [key: string]: string };
    };

    export default function Sugerencias() {
    const router = useRouter();
    const { setPreferencias, preferencias } = useUserPreferences();
    const { settings } = useAppSettings();

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

    useEffect(() => {
        const celulares = celularesData as Celular[];

        let resultados = celulares.filter((cel) => {
        const coincidePresupuesto = cel.precio <= (preferencias.presupuesto ?? Infinity);
        const coincideUso = cel.usoIdeal.map((u) => u.toLowerCase()).includes(preferencias.uso.toLowerCase());
        const coincideMarca =
            preferencias.marcaPreferida === 'ninguna' ||
            cel.marca.toLowerCase() === (preferencias.marcaPreferida?.toLowerCase() ?? '');
        const coincideColor =
            preferencias.colorPreferido === 'ninguno' ||
            cel.color.map((c) => c.toLowerCase()).includes(preferencias.colorPreferido?.toLowerCase() ?? '');
        const coincideTamano =
            preferencias.tamanoPreferido === 'ninguno' ||
            cel.tamano.toLowerCase() === (preferencias.tamanoPreferido?.toLowerCase() ?? '');

        return coincidePresupuesto && coincideUso && coincideMarca && coincideColor && coincideTamano;
        });

        if (resultados.length > 0) {
        setUsoFiltroFlexible(false);
        setSinCoincidencias(false);
        setSugeridos(resultados.slice(0, 3));
        return;
        }

        resultados = celulares.filter((cel) => {
        const coincidePresupuesto = cel.precio <= (preferencias.presupuesto ?? Infinity);
        const coincideUso = cel.usoIdeal.map((u) => u.toLowerCase()).includes(preferencias.uso.toLowerCase());
        return coincidePresupuesto && coincideUso;
        });

        if (resultados.length > 0) {
        setUsoFiltroFlexible(true);
        setSinCoincidencias(false);
        setSugeridos(resultados.slice(0, 3));
        return;
        }

        setUsoFiltroFlexible(true);
        setSinCoincidencias(true);
        setSugeridos(celulares.slice(0, 3));
    }, [preferencias]);

    const elegirMovil = (movil: string) => {
        setPreferencias({ ...preferencias, movilElegido: movil });
        router.push('/resultado');
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>Sugerencias personalizadas</Text>
        <Text style={[styles.subtitle, { color: subTextColor, fontSize: subtitleFont }]}>
            Estos móviles se adaptan a tus necesidades:
        </Text>

        {usoFiltroFlexible && !sinCoincidencias && (
            <Text style={[styles.warning, { fontSize: smallFont }]}>
            * Mostrando resultados aproximados debido a falta de coincidencias exactas con tus preferencias.
            </Text>
        )}

        {sinCoincidencias && (
            <Text style={[styles.warning, { fontSize: smallFont }]}>
            * No se encontraron coincidencias. Mostrando algunos dispositivos populares.
            </Text>
        )}

        {sugeridos.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: cardColor }]}>
            <Image source={getImage(item.id)} style={styles.image} />
            <Text style={[styles.name, { color: textColor, fontSize: subtitleFont }]}>{item.nombre}</Text>
            <Text style={[styles.summary, { color: subTextColor, fontSize: smallFont }]}>{item.resumen}</Text>
            <Pressable style={styles.button} onPress={() => elegirMovil(item.nombre)}>
                <Text style={styles.buttonText}>Ver detalles</Text>
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
