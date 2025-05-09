import celularesData from '@/assets/data/celulares.json';
import { useUserPreferences } from '@/context/UserPreferencesContext';
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
    const [sugeridos, setSugeridos] = useState<Celular[]>([]);
    const [usoFiltroFlexible, setUsoFiltroFlexible] = useState(false);
    const [sinCoincidencias, setSinCoincidencias] = useState(false);

    useEffect(() => {
    const celulares = celularesData as Celular[];

    
    let resultados = celulares.filter((cel) => {
        const coincidePresupuesto = cel.precio <= (preferencias.presupuesto ?? Infinity);
        const coincideUso = cel.usoIdeal.includes(preferencias.uso);
        const coincideMarca = preferencias.marcaPreferida === 'ninguna' || cel.marca === preferencias.marcaPreferida;
        const coincideColor = preferencias.colorPreferido === 'ninguno' || cel.color.includes(preferencias.colorPreferido!);
        const coincideTamano = preferencias.tamanoPreferido === 'ninguno' || cel.tamano === preferencias.tamanoPreferido;
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
        const coincideUso = cel.usoIdeal.includes(preferencias.uso);
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
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sugerencias personalizadas</Text>
        <Text style={styles.subtitle}>Estos móviles se adaptan a tus necesidades:</Text>

        {usoFiltroFlexible && !sinCoincidencias && (
        <Text style={styles.warning}>
          * Mostrando resultados aproximados debido a falta de coincidencias exactas con tus preferencias.
        </Text>
        )}

        {sinCoincidencias && (
        <Text style={styles.warning}>
          * No se encontraron coincidencias. Mostrando algunos dispositivos populares.
        </Text>
        )}

        {sugeridos.map((item) => (
        <View key={item.id} style={styles.card}>
            <Image source={getImage(item.id)} style={styles.image} />
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.summary}>{item.resumen}</Text>
            <Pressable style={styles.button} onPress={() => elegirMovil(item.nombre)}>
            <Text style={styles.buttonText}>Ver detalles</Text>
            </Pressable>
        </View>
        ))}
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 5, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#444', marginBottom: 20, textAlign: 'center' },
    warning: { fontSize: 14, color: '#900', textAlign: 'center', marginBottom: 15 },
    card: { backgroundColor: '#f9f9f9', borderRadius: 10, padding: 15, marginBottom: 20, alignItems: 'center' },
    image: { width: 150, height: 150, resizeMode: 'contain', marginBottom: 10 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    summary: { fontSize: 14, textAlign: 'center', marginBottom: 10, color: '#555' },
    button: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 14 },
});
