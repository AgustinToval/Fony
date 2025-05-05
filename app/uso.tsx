import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Uso() {
    const router = useRouter();

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

    return (
    <View style={styles.container}>
        <Text style={styles.title}>¿Para qué vas a usar tu nuevo celular?</Text>
        {usos.map((uso) => (
        <Pressable
            key={uso.value}
            style={styles.button}
            onPress={() => seleccionarUso(uso.value)}
        >
            <Text style={styles.buttonText}>{uso.label}</Text>
        </Pressable>
        ))}
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a', marginBottom: 30 },
    button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, marginBottom: 15 },
    buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
