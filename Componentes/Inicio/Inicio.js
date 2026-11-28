import { View, Text, StyleSheet } from 'react-native';

export function Inicio() {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        CABURGUA APP
      </Text>

      <View style={styles.subTitleBadge}>
        <Text
          style={styles.subTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Todo el turismo de la zona en una sola App
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 42, // Deja espacio libre en las esquinas para botones superiores (ej. ajustes)
    width: '100%',
  },

  title: {
    fontSize: 40,
    fontFamily: 'Jungle',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(10, 25, 41, 0.75)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 4,
  },

  subTitleBadge: {
    marginTop: 2,
    backgroundColor: 'rgba(12, 36, 54, 0.45)',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },

  subTitle: {
    fontSize: 12.5,
    fontFamily: 'Jungle',
    color: '#FEF9C3',
    textAlign: 'center',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});