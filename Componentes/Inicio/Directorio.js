
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export function Directorio() {
  const [loading, setLoading] = useState(false);
  const [lugaresData, setLugaresData] = useState([]);

  const navigation = useNavigation();

  const fetchDirectorio = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api-caburgua.services.syntaxit.cl/api/v1/categorias/export"
      );

      const data = await response.json();
      setLugaresData(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error cargar lugares:", error);
      setLugaresData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectorio();
  }, []);

  const lugaresActivos = lugaresData.filter(l => l.enable);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>

        {loading && (
          <ActivityIndicator size="large" color="#000" />
        )}

        {!loading && lugaresActivos.length === 0 && (
          <Text>No hay categorías disponibles</Text>
        )}

        {!loading && lugaresActivos.map((lugar) => (
          <TouchableOpacity
            key={lugar.id}
            style={[
              styles.item,
              { borderColor: lugar.color || '#000', borderWidth: 3 }
            ]}
            onPress={() => navigation.navigate(lugar.title)}
          >
            <LinearGradient
              colors={[
                `${lugar.color || '#000'}cc`,
                `${lugar.color || '#000'}80`
              ]}
              style={styles.gradient}
            >
              <MaterialCommunityIcons
                name={lugar.icon || "help-circle"}
                size={62}
                color="#fff"
              />
              <Text style={styles.itemTitle}>
                {lugar.title}
              </Text>
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
