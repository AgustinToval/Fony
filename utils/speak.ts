    // utils/speak.ts
    import type { AppSettings } from '@/context/AppSettingsContext';
import * as Speech from 'expo-speech';

    export const speak = (texto: string, settings: AppSettings) => {
    if (!settings.lectorPantalla) return;

    try {
        const esTextoCorto = texto.length <= 40;
        if (!esTextoCorto) {
        Speech.stop(); // Interrumpe solo si es largo
        }

        Speech.speak(texto, {
        language: settings.idioma === 'en' ? 'en-US' : 'es-ES',
        rate: 1.0,
        pitch: 1.0,
        });
    } catch (error) {
        console.warn('❌ Error al reproducir texto con expo-speech:', error);
    }
    };

    export const stopSpeech = () => {
    try {
        Speech.stop();
    } catch (error) {
        console.warn('❌ Error al detener la voz:', error);
    }
    };
