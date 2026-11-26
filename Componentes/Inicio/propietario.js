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
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Jungle',
        color: 'white',
    }
});