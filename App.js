
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navegacion from './Componentes/Inicio/Navegacion';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Jungle: require('./assets/Fonts/Jungle.ttf'),
  });

  // Si la fuente falla, la app igual arranca con la fuente del sistema
  if (!fontsLoaded && !fontError) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0b1d26',
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Navegacion />
    </SafeAreaProvider>
  );
}