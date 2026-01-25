import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


export function Directorio() {
  const navigation = useNavigation();
  const items = [
    { id: 1, title: 'Turismo',icon: 'hiking', color: '#00008B'},
    { id: 2, title: 'Transporte',icon: 'bus', color: '#093703'},
    { id: 3, title: 'Negocios',icon: 'storefront', color: '#FFA500'},
    { id: 4, title: 'Cabañas',icon: 'home-group', color: '#FFA500'},
    { id: 5, title: 'Camping',icon: 'campfire', color: '#00008B'},
    { id: 6, title: 'Cultura',icon: 'theater', color:'#093703'},
    { id: 7, title: 'Servicios',icon: 'tools', color: '#00008B'},
    { id: 8, title: 'Gastronomia',icon: 'food', color: '#093703'},
    { id: 9, title: 'Paseos y Tours',icon: 'map-marker-radius', color: '#FFA500'},
    { id: 10, title: 'Salud',icon: 'hospital-box', color: '#FF0000'},
    { id: 11, title: 'Estacionamiento',icon: 'car', color: '#FFA500'},
    { id: 12, title: 'Emergencias',icon: 'alert-circle', color: '#FF0000'},

  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map(item => (
          <TouchableOpacity 
          key={item.id} 
          style={[styles.item, { borderColor: item.color, borderWidth: 3 }]} 
         
          onPress={() => {
            const destinosValidos = 
              [
                   'Transporte', 'Turismo','Negocios','Cabañas','Camping',
                   'Cultura','Servicios','Salud','Emergencias','Gastronomia',
                   'Paseos y Tours', 'Estacionamiento',  
                ]; 

            if (destinosValidos.includes(item.title)) {
              navigation.navigate(item.title);
            }
          }}
        >
          <LinearGradient
            colors={[`${item.color}cc`, `${item.color}80`]} 
            style={styles.gradient}
          >
            <MaterialCommunityIcons name={item.icon} size={62} color="#fff" />
            <Text style={styles.itemTitle}>{item.title}</Text>
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
 
});
