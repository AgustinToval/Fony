    import type { AppSettings } from '@/context/AppSettingsContext';
import * as Speech from 'expo-speech';

    export const speak = (texto: string, settings: AppSettings) => {
    if (!settings.lectorPantalla) return;

    Speech.speak(texto, {
        language: settings.idioma === 'en' ? 'en-US' : 'es-ES',
        rate: 1.0,
        pitch: 1.0,
    });
    };
