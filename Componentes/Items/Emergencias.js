import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function Emergencias() {
  const items = [
    { id: 1, title: 'Ambulancia', icon: 'ambulance', numero: '131' },
    { id: 2, title: 'Bomberos', icon: 'fire-truck', numero: '133' },
    { id: 3, title: 'Carabineros', icon: 'police-badge', numero: '133' },
    { id: 4, title: 'Guardia Marina', icon: 'anchor', numero: '300' },
    { id: 5, title: 'PDI', icon: 'badge-account', numero: '134' },
    { id: 6, title: 'CONAF', icon: 'pine-tree', numero: '130' },
  ];

  const llamar = (numero) => {
    const url = `tel:${numero}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      })
      .catch(err => console.error('Error al intentar llamar', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergencias</Text>

      <View style={styles.grid}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, { borderColor: '#FF4B4B', borderWidth: 3 }]}
            activeOpacity={0.7}
            onPress={() => llamar(item.numero)}
          >
            <LinearGradient
              colors={['#FF4B4B', '#C0392B']}
              style={styles.gradient}
            >
              <MaterialCommunityIcons name={item.icon} size={50} color="#fff" />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.advertencia}>
        <Text style={styles.advtex}>
         🚨 Los números de emergencia son para casos urgentes.
         Llama solo en situaciones reales que requieran ayuda inmediata.
         Úsalos con responsabilidad.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF4B4B',
    textTransform: 'uppercase',
    marginTop: 40,
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '95%',
  },

  item: {
    width: '45%',
    height: 120,
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },

  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
  },

  itemTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 23,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  phoneIcon: {
    marginTop: 5,
  },

  advertencia: {
    width: 350,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },

  advtex:{
    fontSize: 20,
    padding: 10,
  }
});
