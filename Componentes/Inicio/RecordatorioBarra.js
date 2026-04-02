import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { BlurView } from "expo-blur";

export function RecordatorioBarra() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        const response = await fetch(
          "https://api-caburgua.services.syntaxit.cl/recordatorios"
        );
        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        const activos = data.filter((r) => r.activo === true);
        setRecordatorios(activos);
      } catch (error) {
        console.error("Error cargando recordatorios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordatorios();
  }, []);

  useEffect(() => {
    if (recordatorios.length === 0) return;

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
  }, [recordatorios]);

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <ActivityIndicator size="small" color="#fff" />
        </BlurView>
      </View>
    );
  }

  if (recordatorios.length === 0) return null;

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.container}>
        <Text style={styles.title}>RECUERDA:</Text>
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          {recordatorios[index].texto}
        </Animated.Text>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",       // ✅ adaptable a cualquier pantalla
    borderRadius: 15,
    overflow: "hidden",
  },
  container: {
    minHeight: 80,      // ✅ crece si el texto es largo
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
    width: "100%",      // ✅ fuerza el ancho completo en Android
  },
});