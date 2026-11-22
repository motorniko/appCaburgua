import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Linking, ActivityIndicator, ScrollView, RefreshControl
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

export function Emergencias() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [emergencias, setEmergencias] = useState([]);
  const ultimaCarga = useRef(0);

  const fetchEmergencias = useCallback(async ({ silencioso = false } = {}) => {
    try {
      if (!silencioso) setLoading(true);
      const response = await fetch(
        "https://api-caburgua.albertolagos59.workers.dev/emergencias",
        { headers: { "Cache-Control": "no-cache" } }
      );
      const data = await response.json();
      setEmergencias(Array.isArray(data) ? data : []);
      ultimaCarga.current = Date.now();
    } catch (error) {
      console.error("Error cargando emergencias:", error);
    } finally {
      if (!silencioso) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmergencias({ silencioso: false });
  }, [fetchEmergencias]);

  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimaCarga.current > 15000) {
        fetchEmergencias({ silencioso: true });
      }
    }, [fetchEmergencias])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEmergencias({ silencioso: true });
    setRefreshing(false);
  }, [fetchEmergencias]);

  const llamar = async (numero) => {
    const url = `tel:${numero}`;
    const soportado = await Linking.canOpenURL(url);
    if (soportado) {
      Linking.openURL(url);
    } else {
      console.error('Este dispositivo no puede realizar llamadas');
    }
  };

  if (loading && emergencias.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF4B4B" />
      }
    >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 20,
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
  advtex: { fontSize: 20, padding: 10 }
});