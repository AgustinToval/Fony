    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Uso() {
    const router = useRouter();
    const { settings } = useAppSettings();

    const usos = [
        { label: 'Redes sociales', value: 'redes' },
        { label: 'Fotos y videos', value: 'multimedia' },
        { label: 'Juegos', value: 'juegos' },
        { label: 'Trabajo / productividad', value: 'trabajo' },
        { label: 'Otro uso general', value: 'otro' },
    ];

    const seleccionarUso = (tipo: string) => {
        console.log('Uso seleccionado:', tipo);
        router.push({ pathname: '/subuso', params: { uso: tipo } });
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const titleFont = getFontSize('large', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { fontSize: titleFont, color: textColor }]}>
            ¿Qué uso principal le darás a tu nuevo celular?
        </Text>
        {usos.map((uso) => (
            <Pressable
            key={uso.value}
            style={styles.button}
            onPress={() => seleccionarUso(uso.value)}
            >
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>{uso.label}</Text>
            </Pressable>
        ))}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center' },
    title: { fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
    button: {
        backgroundColor: '#2563eb',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    });
