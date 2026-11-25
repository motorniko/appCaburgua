import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Linking, ActivityIndicator, ScrollView, RefreshControl
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Emergencias() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [emergencias, setEmergencias] = useState([]);
  const ultimaCarga = useRef(0);
  const cargaEnCurso = useRef(false);

  const fetchEmergencias = useCallback(async ({ silencioso = false } = {}) => {
    if (cargaEnCurso.current) return;
    cargaEnCurso.current = true;
    try {
      if (!silencioso) setLoading(true);
      const response = await fetch(
        "https://api-caburgua.albertolagos59.workers.dev/emergencias",
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setEmergencias(Array.isArray(data) ? data : []);
      ultimaCarga.current = Date.now();
    } catch (error) {
      console.error("Error cargando emergencias:", error);
    } finally {
      if (!silencioso) setLoading(false);
      cargaEnCurso.current = false;
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
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 28,
        },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF4B4B" />
      }
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

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
              <Text
                style={styles.itemTitle}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topBar: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF4B4B',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 28,
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
    marginBottom: 24,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 6,
  },
  itemTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
  },
  advertencia: {
    width: '92%',
    maxWidth: 420,
    marginTop: 8,
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },
  advtex: {
    fontSize: 18,
    padding: 6,
  }
});