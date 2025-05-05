import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function () {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FONY</Text>
      <Text style={styles.subtitle}>Tu guía para encontrar el celular ideal</Text>

      <Pressable style={styles.button} onPress={() => router.push({ pathname: '/perfil' as any })}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#444', marginBottom: 30, textAlign: 'center' },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
});
