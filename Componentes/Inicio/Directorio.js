//aqui se dibujan los itens de la pagina principal(primera pantalla)

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { lugaresData } from '../../data/LugaresData';



export function Directorio() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {lugaresData.map(lugar => (
          <TouchableOpacity 
          key={lugar.id} 
          style={[styles.item, { borderColor: lugar.color, borderWidth: 3 }]} 
         
          onPress={() => {
            if (lugar.enable) {
              navigation.navigate(lugar.title);
            }
          }}
        >
          <LinearGradient
            colors={[`${lugar.color}cc`, `${lugar.color}80`]} 
            style={styles.gradient}
          >
            <MaterialCommunityIcons name={lugar.icon} size={62} color="#fff" />
            <Text style={styles.itemTitle}>{lugar.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
  },
  item: {
    width: '31%',
    height: 100,
    marginBottom: 15,
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
    fontFamily: 'Jungle',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
});
