    import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

    // Definimos el tipo directamente 
    export type AppSettings = {
    idioma: 'es' | 'en';
    moneda: 'USD' | 'EUR';
    tamanioLetra: 'pequeno' | 'normal' | 'grande';
    modoOscuro: boolean;
    lectorPantalla: boolean;
    };

    const defaultSettings: AppSettings = {
    idioma: 'es',
    moneda: 'USD',
    tamanioLetra: 'normal',
    modoOscuro: false,
    lectorPantalla: false,
    };

    type ContextType = {
    settings: AppSettings;
    setSettings: (s: Partial<AppSettings>) => void;
    };

    const AppSettingsContext = createContext<ContextType>({
    settings: defaultSettings,
    setSettings: () => {},
    });

    export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettingsState] = useState<AppSettings>(defaultSettings);

    useEffect(() => {
        const load = async () => {
        const stored = await AsyncStorage.getItem('appSettings');
        if (stored) setSettingsState(JSON.parse(stored));
        };
        load();
    }, []);

    const setSettings = async (newSettings: Partial<AppSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettingsState(updated);
        await AsyncStorage.setItem('appSettings', JSON.stringify(updated));
    };

    return (
        <AppSettingsContext.Provider value={{ settings, setSettings }}>
        {children}
        </AppSettingsContext.Provider>
    );
    };

    export const useAppSettings = () => useContext(AppSettingsContext);
    export { AppSettingsContext };

