import { AppSettingsProvider, useAppSettings } from '@/context/AppSettingsContext';
import { UserPreferencesProvider } from '@/context/UserPreferencesContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import 'react-native-reanimated';

function InnerLayout() {
  const { settings } = useAppSettings();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const theme = useMemo(() => (settings.modoOscuro ? DarkTheme : DefaultTheme), [settings.modoOscuro]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme}>
      <UserPreferencesProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="perfil" options={{ title: 'Selecciona tu perfil' }} />
        </Stack>
        <StatusBar style={settings.modoOscuro ? 'light' : 'dark'} />
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppSettingsProvider>
      <InnerLayout />
    </AppSettingsProvider>
  );
}
