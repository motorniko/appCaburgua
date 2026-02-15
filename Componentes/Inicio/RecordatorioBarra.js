import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";

export function RecordatorioBarra() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        const response = await fetch(
          "https://api-caburgua.services.syntaxit.cl/recordatorios"
        );

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

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
      setIndex((prev) => (prev + 1) % recordatorios.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [recordatorios]);

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  if (recordatorios.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.container}>
        <Text style={styles.title}>RECUERDA:</Text>
        <Text style={styles.text}>
          {recordatorios[index].texto}
        </Text>
      </BlurView>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    width: 370,
    borderRadius: 15,
    overflow: "hidden",
  },
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    color: "yellow",
    flexShrink: 1,
    fontSize: 18,
  },
});
