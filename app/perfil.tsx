import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function Perfil() {
    const router = useRouter();

    const perfiles = [
    { label: 'Adulto mayor / sin experiencia', value: 'mayor' },
    { label: 'Adulto con conocimientos básicos', value: 'basico' },
    { label: 'Usuario con experiencia', value: 'experto' },
    ];

    const seleccionarPerfil = (tipo: string) => {
    console.log('Perfil seleccionado:', tipo);
    router.push({ pathname: '/uso' }); 
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>¿Quién está usando Fony?</Text>
        {perfiles.map((perfil) => (
        <Pressable
            key={perfil.value}
            style={styles.button}
            onPress={() => seleccionarPerfil(perfil.value)}
        >
            <Text style={styles.buttonText}>{perfil.label}</Text>
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
