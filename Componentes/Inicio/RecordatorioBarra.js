
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { recordatoriosData } from "../../data/RecordatoriosData";

export function RecordatorioBarra() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % recordatoriosData.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.container}>
        <Text style={styles.title}>RECUERDA:</Text>
        <Text style={styles.text}>{recordatoriosData[index]}</Text>
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
