import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated, AppState } from "react-native";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "@react-navigation/native";

export function RecordatorioBarra({ refreshKey = 0 }) {
  const [recordatorios, setRecordatorios] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const appState = useRef(AppState.currentState);
  const ultimaCarga = useRef(0);

  const fetchRecordatorios = useCallback(async ({ silencioso = false } = {}) => {
    try {
      if (!silencioso) setLoading(true);
      const response = await fetch(
        "https://api-caburgua.albertolagos59.workers.dev/recordatorios",
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      const activos = Array.isArray(data)
        ? data.filter((r) => r.activo === true)
        : [];
      setRecordatorios(activos);
      setIndex((prev) => (activos.length > 0 ? prev % activos.length : 0));
      ultimaCarga.current = Date.now();
    } catch (error) {
      console.error("Error cargando recordatorios:", error);
    } finally {
      if (!silencioso) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecordatorios({ silencioso: recordatorios.length > 0 });
  }, [fetchRecordatorios, refreshKey]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const volvioActiva =
        appState.current.match(/inactive|background/) &&
        nextAppState === "active";
      appState.current = nextAppState;

      if (volvioActiva && Date.now() - ultimaCarga.current > 15000) {
        fetchRecordatorios({ silencioso: true });
      }
    });

    return () => subscription.remove();
  }, [fetchRecordatorios]);

  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimaCarga.current > 15000) {
        fetchRecordatorios({ silencioso: true });
      }
    }, [fetchRecordatorios])
  );

  useEffect(() => {
    if (recordatorios.length <= 1) return;

    const intervalo = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % recordatorios.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(intervalo);
  }, [recordatorios, fadeAnim]);

  if (loading && recordatorios.length === 0) {
    return (
      <View style={styles.wrapper}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <ActivityIndicator size="small" color="#fff" />
        </BlurView>
      </View>
    );
  }

  if (recordatorios.length === 0) return null;

  const actual = recordatorios[index] || recordatorios[0];

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.container}>
        <Text style={styles.title}>RECUERDA:</Text>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          {actual?.texto}
        </Animated.Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",
    borderRadius: 15,
    overflow: "hidden",
  },
  container: {
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 6,
  },
  text: {
    color: "yellow",
    fontSize: 17,
    textAlign: "center",
    width: "100%",
  },
});