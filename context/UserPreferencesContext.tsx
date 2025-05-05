// context/UserPreferencesContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Preferencias = {
    uso: string;
    sliders: Record<string, number>;
};

type ContextType = {
    preferencias: Preferencias;
    setPreferencias: (data: Preferencias) => void;
};

const UserPreferencesContext = createContext<ContextType | null>(null);

export const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
    const [preferencias, setPreferencias] = useState<Preferencias>({
    uso: '',
    sliders: {},
    });

    return (
    <UserPreferencesContext.Provider value={{ preferencias, setPreferencias }}>
        {children}
    </UserPreferencesContext.Provider>
    );
};

export const useUserPreferences = () => {
    const context = useContext(UserPreferencesContext);
    if (!context) throw new Error('useUserPreferences must be used within the provider');
    return context;
};
