import { StyleSheet, Text, View } from 'react-native';

export default function Resultado() {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>¡Aquí verás tu celular ideal!</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center' },
});
