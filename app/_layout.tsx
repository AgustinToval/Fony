import { AppSettingsProvider, useAppSettings } from '@/context/AppSettingsContext';
import { UserPreferencesProvider } from '@/context/UserPreferencesContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

function InnerLayout() {
  const { settings: config } = useAppSettings();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={config.modoOscuro ? DarkTheme : DefaultTheme}>
      <UserPreferencesProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="perfil" options={{ title: 'Selecciona tu perfil' }} />
        </Stack>
        <StatusBar style="auto" />
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
