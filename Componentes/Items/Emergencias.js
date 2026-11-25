import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchJson } from "../Inicio/api";
import { limpiarTelefono } from "../Inicio/utils";

const CACHE_KEY = "emergencias_cache_v1";
const REFRESCO_MIN_MS = 15000;

// Respaldo local: esta pantalla nunca queda vacía ni bloqueada, aunque no haya
// señal ni caché. Son los números oficiales de Chile.
const NUMEROS_BASE = [
  { id: "base-131", title: "Ambulancia (SAMU)", numero: "131", icon: "ambulance" },
  { id: "base-132", title: "Bomberos", numero: "132", icon: "fire-truck" },
  { id: "base-133", title: "Carabineros", numero: "133", icon: "shield-account" },
  { id: "base-134", title: "PDI", numero: "134", icon: "shield-search" },
  { id: "base-130", title: "Incendios forestales (CONAF)", numero: "130", icon: "fire-alert" },
];

export function Emergencias() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [emergencias, setEmergencias] = useState(NUMEROS_BASE);
  const [sinConexion, setSinConexion] = useState(false);

  // Parte en "ahora" porque la carga inicial la hace el efecto de abajo
  const ultimaCarga = useRef(Date.now());
  const cargaEnCurso = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchEmergencias = useCallback(async () => {
    if (cargaEnCurso.current) return;
    cargaEnCurso.current = true;
    try {
      const data = await fetchJson("/emergencias");
      const lista = Array.isArray(data)
        ? data.filter((e) => limpiarTelefono(e?.numero))
        : [];
      if (lista.length === 0) return; // no pisar lo que ya se muestra con una lista vacía
      ultimaCarga.current = Date.now();
      if (!mounted.current) return;
      setEmergencias(lista);
      setSinConexion(false);
      AsyncStorage.setItem(CACHE_KEY, JSON.stringify(lista)).catch(() => {});
    } catch (error) {
      console.error("Error cargando emergencias:", error);
      if (mounted.current) setSinConexion(true);
    } finally {
      cargaEnCurso.current = false;
    }
  }, []);

  // 1) Mostrar al instante lo último guardado, 2) actualizar desde la red
  useEffect(() => {
    (async () => {
      try {
        const cache = await AsyncStorage.getItem(CACHE_KEY);
        if (cache && mounted.current) {
          const lista = JSON.parse(cache);
          if (Array.isArray(lista) && lista.length > 0) setEmergencias(lista);
        }
      } catch {}
      fetchEmergencias();
    })();
  }, [fetchEmergencias]);

  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimaCarga.current > REFRESCO_MIN_MS) {
        fetchEmergencias();
      }
    }, [fetchEmergencias])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchEmergencias();
    } finally {
      setRefreshing(false);
    }
  }, [fetchEmergencias]);

  // Abre el marcador directamente (canOpenURL falla con "tel:" en Android 11+).
  // En Android se abre el teléfono con el número escrito y en iOS pide confirmar,
  // así que no hay llamadas accidentales.
  const llamar = async (numero) => {
    const tel = limpiarTelefono(numero);
    if (!tel) return;
    try {
      await Linking.openURL(`tel:${tel}`);
    } catch {
      Alert.alert("No se pudo llamar", `Marca el ${tel} manualmente en tu teléfono.`);
    }
  };

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 28,
        },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FF4B4B"
        />
      }
    >
      <View style={styles.contenido}>
        <StatusBar style="dark" />
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="Volver"
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Emergencias</Text>

        {sinConexion && (
          <Text style={styles.aviso}>
            Sin conexión. Mostrando los últimos números guardados.
          </Text>
        )}

        <View style={styles.grid}>
          {emergencias.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.item, { borderColor: "#FF4B4B", borderWidth: 3 }]}
              activeOpacity={0.7}
              onPress={() => llamar(item.numero)}
              accessibilityRole="button"
              accessibilityLabel={`Llamar a ${item.title}, número ${item.numero}`}
            >
              <LinearGradient
                colors={["#FF4B4B", "#C0392B"]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name={item.icon || "alert"}
                  size={44}
                  color="#fff"
                />
                <Text
                  style={styles.itemTitle}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  maxFontSizeMultiplier={1.2}
                >
                  {item.title}
                </Text>
                <Text style={styles.itemNumero} maxFontSizeMultiplier={1.2}>
                  {item.numero}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: { backgroundColor: "#f2f2f2" },
  // En tablets el contenido no se estira: ancho máximo y centrado
  contenido: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  topBar: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF4B4B",
    textTransform: "uppercase",
    marginTop: 16,
    marginBottom: 28,
  },
  aviso: {
    width: "92%",
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginTop: -16,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "95%",
  },
  item: {
    width: "45%",
    height: 140,
    marginBottom: 24,
    borderRadius: 15,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 6,
  },
  itemTitle: {
    marginTop: 6,
    fontWeight: "bold",
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
  },
  itemNumero: {
    marginTop: 2,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  advertencia: {
    width: "92%",
    maxWidth: 420,
    marginTop: 8,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },
  advtex: {
    fontSize: 18,
    padding: 6,
  },
});