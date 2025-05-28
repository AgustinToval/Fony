import { useAppSettings } from '@/hooks/useAppSettings';
import { t } from '@/utils/i18n';
import { speak } from '@/utils/speak';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Pantalla de bienvenida inicial. Introduce brevemente la app y permite iniciar el recorrido.
export default function Index() {
  const router = useRouter();
  const { settings } = useAppSettings();
  const lang = settings.idioma;

    // cuando se muestra la pantalla, se reproduce un mensaje introductorio si el lector está activo
  useFocusEffect(
    useCallback(() => {
      if (settings.lectorPantalla) {
        const mensaje =
          `${t('index.titulo', lang)}. ` +
          `${t('index.subtitulo', lang)}. ` +
          (lang === 'es'
            ? 'Presione el botón para comenzar.'
            : 'Press the button to start.');
        speak(mensaje, settings);
      }
    }, [settings])
  );

    // Al presionar el botón, se lee el texto y se navega a la siguiente pantalla
  const handleStart = () => {
    if (settings.lectorPantalla) {
      speak(t('index.boton', lang), settings);
    }
    setTimeout(() => router.push('/perfil'), 800); // Pequeña pausa para permitir oír el mensaje
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('index.titulo', lang)}</Text>
      <Text style={styles.subtitle}>{t('index.subtitulo', lang)}</Text>

      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>{t('index.boton', lang)}</Text>
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
