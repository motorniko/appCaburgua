import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { BlurView } from "expo-blur";
import { fetchJson } from "./api";

const CLIMA_ERROR = {
  ciudad: "Caburgua",
  temperatura: "--°C",
  descripcion: "No disponible",
  icono: "01d",
};

export function Clima({ refreshKey = 0 }) {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarClima = useCallback(async () => {
    try {
      const data = await fetchJson("/clima");
      const temp = Number(data?.temperatura);
      const desc = data?.descripcion || "No disponible";
      setClima({
        ciudad: data?.ciudad || "Caburgua",
        temperatura: Number.isFinite(temp) ? `${Math.round(temp)}°C` : "--°C",
        descripcion: desc.charAt(0).toUpperCase() + desc.slice(1),
        icono: /^\d{2}[dn]$/.test(data?.icono) ? data.icono : "01d",
      });
    } catch (error) {
      console.error("Error cargando clima:", error);
      setClima((prev) => prev ?? CLIMA_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarClima();
  }, [cargarClima, refreshKey]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.blurBox}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          {loading ? (
            <ActivityIndicator size="small" color="#FDE68A" />
          ) : clima ? (
            <View style={styles.row}>
              <View style={styles.leftGroup}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${clima.icono}@2x.png`,
                  }}
                  style={styles.icon}
                />
                <Text style={styles.city} numberOfLines={1}>
                  {clima.ciudad}
                </Text>
                <Text style={styles.temp} numberOfLines={1}>
                  {clima.temperatura}
                </Text>
              </View>

              <Text style={styles.desc} numberOfLines={1}>
                {clima.descripcion}
              </Text>
            </View>
          ) : (
            <Text style={styles.desc}>Sin datos del clima</Text>
          )}
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "95%",
    marginTop: 5,
    marginBottom: 15,
  },
  blurBox: {
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.24)",
  },
  container: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  icon: {
    width: 34,
    height: 34,
    marginRight: 6,
  },
  city: {
    fontFamily: "Jungle",
    fontSize: 16,
    letterSpacing: 0.6,
    color: "#FFFFFF",
    marginRight: 8,
    textShadowColor: "rgba(0, 0, 0, 0.65)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  temp: {
    color: "#FDE68A",
    fontSize: 15,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  desc: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    maxWidth: "42%",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});