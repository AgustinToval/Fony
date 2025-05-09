import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Home() {
    const router = useRouter();
    const { settings: config } = useAppSettings();


    const titleFont = getFontSize('large', config.tamanioLetra);
    const subtitleFont = getFontSize('medium', config.tamanioLetra);
    const buttonFont = getFontSize('medium', config.tamanioLetra);

    const isDark = config.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Pressable style={styles.settingsIcon} onPress={() => router.push('/configuracion')}>
            <Ionicons name="settings-outline" size={26} color={textColor} />
        </Pressable>

        <Text style={[styles.title, { fontSize: titleFont, color: textColor }]}>
            ¡Bienvenido a Fony!
        </Text>
        <Text style={[styles.subtitle, { fontSize: subtitleFont, color: isDark ? '#ccc' : '#444' }]}>
            ¿Qué quieres hacer hoy?
        </Text>

        <Pressable style={styles.button} onPress={() => router.push('/perfil')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>📱 Buscar mi próximo celular</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/favoritos')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>⭐ Ver favoritos</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/sugerencias')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>🛒 Últimas sugerencias</Text>
        </Pressable>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    });
