    import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

    export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Fony!</Text>
        <Text style={styles.subtitle}>¿Qué querés hacer hoy?</Text>

        <Pressable style={styles.button} onPress={() => router.push('/perfil')}>
            <Text style={styles.buttonText}>📱 Buscar mi próximo celular</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/favoritos' as any)}>
            <Text style={styles.buttonText}>⭐ Ver favoritos</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/sugerencias')}>
            <Text style={styles.buttonText}>🛒 Últimas sugerencias</Text>
        </Pressable>

        {/* Futuro: Configuración o perfil */}
        {/* <Pressable style={styles.button} onPress={() => router.push('/ajustes')}>
            <Text style={styles.buttonText}>⚙️ Ajustes</Text>
        </Pressable> */}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#444', marginBottom: 30, textAlign: 'center' },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        width: '90%',
    },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
    });
