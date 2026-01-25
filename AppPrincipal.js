import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Inicio } from './Componentes/Inicio/Inicio';
import { Directorio } from './Componentes/Inicio/Directorio';
import { RecordatorioBarra } from './Componentes/Inicio/RecordatorioBarra';
import { Clima } from './Componentes/Inicio/Clima';

export function AppPrincipal() {
  return (
    <ImageBackground 
      source={require('./assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill} />
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Inicio />
        <Clima />
        <Directorio />
        <RecordatorioBarra />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
