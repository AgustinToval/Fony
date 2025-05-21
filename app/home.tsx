    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Home() {
    const router = useRouter();
    const { settings } = useAppSettings();
    const { colors, dark } = useTheme();

    const titleFont = getFontSize('large', settings.tamanioLetra);
    const subtitleFont = getFontSize('medium', settings.tamanioLetra);
    const buttonFont = getFontSize('medium', settings.tamanioLetra);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={styles.settingsIcon} onPress={() => router.push('/configuracion')}>
            <Ionicons name="settings-outline" size={26} color={colors.text} />
        </Pressable>

        <Text style={[styles.title, { fontSize: titleFont, color: colors.text }]}>
            {t('home.bienvenida', settings.idioma)}
        </Text>
        <Text style={[styles.subtitle, { fontSize: subtitleFont, color: colors.text }]}>
            {t('home.pregunta', settings.idioma)}
        </Text>

        <Pressable style={styles.button} onPress={() => router.push('/perfil')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>
            📱 {t('home.buscar', settings.idioma)}
            </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/favoritos')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>
            ⭐ {t('home.favoritos', settings.idioma)}
            </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/sugerencias')}>
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>
            🛒 {t('home.sugerencias', settings.idioma)}
            </Text>
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
