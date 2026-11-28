import { View, Text, StyleSheet } from 'react-native';

export function Propietario() {
  return (
    <View>
      <Text style={styles.letra}>
        Creado y desarrollado By @Motorniko.dev
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
    letra: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Jungle',
        color: 'white',
    }
});