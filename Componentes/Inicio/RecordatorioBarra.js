import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  AppState,
} from "react-native";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "@react-navigation/native";
import { fetchJson } from "./api";

const REFRESCO_MIN_MS = 15000;
const ROTACION_MS = 5000;

// Acepta true, 1 o "1" (D1/SQLite suele devolver 0/1)
const estaActivo = (r) =>
  r?.activo === true || r?.activo === 1 || r?.activo === "1";

export function RecordatorioBarra({ refreshKey = 0 }) {
  const [recordatorios, setRecordatorios] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const appState = useRef(AppState.currentState);
  const ultimaCarga = useRef(0);
  const mounted = useRef(true);
  const cargaEnCurso = useRef(false);

  const total = recordatorios.length;
  const totalRef = useRef(0);
  totalRef.current = total;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetchRecordatorios = useCallback(async () => {
    if (cargaEnCurso.current) return;
    cargaEnCurso.current = true;
    try {
      const data = await fetchJson("/recordatorios");
      const activos = Array.isArray(data) ? data.filter(estaActivo) : [];
      if (!mounted.current) return;
      setRecordatorios(activos);
      setIndex((prev) => (activos.length > 0 ? prev % activos.length : 0));
      ultimaCarga.current = Date.now();
    } catch (error) {
      console.error("Error cargando recordatorios:", error);
    } finally {
      cargaEnCurso.current = false;
      if (mounted.current) setLoading(false);
    }
  }, []);

  // Carga inicial y pull-to-refresh (refreshKey cambia)
  useEffect(() => {
    fetchRecordatorios();
  }, [fetchRecordatorios, refreshKey]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (next) => {
      const volvioActiva =
        /inactive|background/.test(appState.current) && next === "active";
      appState.current = next;
      if (volvioActiva && Date.now() - ultimaCarga.current > REFRESCO_MIN_MS) {
        fetchRecordatorios();
      }
    });
    return () => subscription.remove();
  }, [fetchRecordatorios]);

  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimaCarga.current > REFRESCO_MIN_MS) {
        fetchRecordatorios();
      }
    }, [fetchRecordatorios])
  );

  // Rotación: depende solo de la cantidad, así un refetch no reinicia el timer
  useEffect(() => {
    if (total <= 1) {
      fadeAnim.setValue(1);
      return;
    }

    const intervalo = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished || !mounted.current) return;
        setIndex((prev) =>
          totalRef.current > 0 ? (prev + 1) % totalRef.current : 0
        );
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, ROTACION_MS);

    return () => {
      clearInterval(intervalo);
      fadeAnim.stopAnimation();
      fadeAnim.setValue(1); // evita que el texto quede invisible
    };
  }, [total, fadeAnim]);

  if (loading && total === 0) {
    return (
      <View style={styles.wrapper}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <ActivityIndicator size="small" color="#fff" />
        </BlurView>
      </View>
    );
  }

  if (total === 0) return null;

  const actual = recordatorios[index] || recordatorios[0];

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.container}>
        <Text style={styles.title}>IMPORTANTE:</Text>
        <View style={styles.textSlot}>
          <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
            {actual?.texto}
          </Animated.Text>
        </View>
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
    minHeight: 104,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  textSlot: {
    width: "100%",
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "yellow",
    fontSize: 15,
    textAlign: "center",
    width: "100%",
  },
});