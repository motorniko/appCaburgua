import { View, Text, StyleSheet } from 'react-native';

export function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CABURGUA</Text>
      <Text style={styles.subTitle}>
        Todo el turismo de la zona en una sola App.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },

  title: {

    width: 240,
    fontSize: 70,
    fontFamily: 'Jungle',
    color: 'white',
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
    // Sombra aventurera estilo logo
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});
