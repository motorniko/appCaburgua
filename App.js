import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import Navegacion from './Componentes/Inicio/Navegacion';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jungle: require('./assets/Fonts/Jungle.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Navegacion />;
}