    import { useAppSettings } from '@/hooks/useAppSettings';
import { getFontSize } from '@/utils/getFontSize';
import { t } from '@/utils/i18n';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Perfil() {
    const router = useRouter();
    const { settings } = useAppSettings();
    const lang = settings.idioma;

    const perfiles = [
        { label: t('perfil.mayor', lang), value: 'mayor' },
        { label: t('perfil.basico', lang), value: 'basico' },
        { label: t('perfil.experto', lang), value: 'experto' },
    ];

    const seleccionarPerfil = (tipo: string) => {
        console.log('Perfil seleccionado:', tipo);
        router.push('/uso');
    };

    const isDark = settings.modoOscuro;
    const bgColor = isDark ? '#111' : '#fff';
    const textColor = isDark ? '#eee' : '#1e3a8a';
    const buttonFont = getFontSize('medium', settings.tamanioLetra);
    const titleFont = getFontSize('large', settings.tamanioLetra);

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.title, { color: textColor, fontSize: titleFont }]}>
            {t('perfil.titulo', lang)}
        </Text>

        {perfiles.map((perfil) => (
            <Pressable
            key={perfil.value}
            style={styles.button}
            onPress={() => seleccionarPerfil(perfil.value)}
            >
            <Text style={[styles.buttonText, { fontSize: buttonFont }]}>{perfil.label}</Text>
            </Pressable>
        ))}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
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
