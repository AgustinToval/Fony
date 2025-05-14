    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Home() {
    const router = useRouter();
    const { settings } = useAppSettings();
    const { colors, dark } = useTheme();
console.log('🔍 TEMA ACTUAL:', dark ? 'Dark' : 'Light');

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={styles.settingsIcon} onPress={() => router.push('/configuracion')}>
            <Ionicons name="settings-outline" size={26} color={colors.text} />
        </Pressable>

        <Text style={[styles.title, { fontSize: titleFont, color: colors.text }]}>
            ¡Bienvenido a Fony!
        </Text>
        <Text style={[styles.subtitle, { fontSize: subtitleFont, color: colors.text }]}>
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
