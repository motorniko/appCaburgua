import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Degradado oscuro bajo la barra de estado: los íconos (hora, señal, batería)
// se leen sobre cualquier imagen de fondo.
export function ScrimBarraEstado() {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      pointerEvents="none"
      colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0)"]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: insets.top + 12,
      }}
    />
  );
}