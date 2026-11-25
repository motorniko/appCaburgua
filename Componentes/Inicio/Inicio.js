// Este es el inicio de la aplicación
import { View, Text, StyleSheet } from 'react-native';

export function Inicio() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        CABURGUA
      </Text>
      <Text
        style={styles.subTitle}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        Todo el turismo de la zona en una sola App.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginBottom: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 70,
    fontFamily: 'Jungle',
    color: 'white',
    textAlign: 'center',
    // Sombra aventurera estilo logo
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 3, height: 5 },
    textShadowRadius: 1,
  },

  subTitle: {
    marginTop: 5,
    fontSize: 20,
    fontFamily: 'Jungle',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    // Sombra aventurera estilo logo
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});