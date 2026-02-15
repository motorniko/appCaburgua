import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function Emergencias() {

  const [loading, setLoading] = useState(false);
  const [emergencias, setEmergencias] = useState([]);

  const fetchEmergencias = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api-caburgua.services.syntaxit.cl/emergencias"
      );

      const data = await response.json();
      setEmergencias(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error cargando emergencias:", error);
      setEmergencias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencias();
  }, []);

  const llamar = (numero) => {
    const url = `tel:${numero}`;
    Linking.openURL(url).catch(err =>
      console.error('Error al intentar llamar', err)
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4B4B" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergencias</Text>

      <View style={styles.grid}>
        {emergencias.map(item => (
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
              <MaterialCommunityIcons
                name={item.icon || "alert"}
                size={50}
                color="#fff"
              />
              <Text style={styles.itemTitle}>
                {item.title}
              </Text>
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
  },
  advertencia: {
    width: 350,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },
  advtex: {
    fontSize: 20,
    padding: 10,
  }
});
