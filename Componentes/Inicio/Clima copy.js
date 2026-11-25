import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { BlurView } from "expo-blur";

export function Clima() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCaburguaClima = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api-caburgua.albertolagos59.workers.dev/clima"
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setClima({
        ciudad: data.ciudad || "Caburgua",
        temperatura: `${data.temperatura} °C`,
        descripcion: data.descripcion || "Clima no disponible",
        icono: data.icono || "01d"
      });
    } catch (error) {
      console.error("Error cargando clima:", error);

      setClima({
        ciudad: "Caburgua",
        temperatura: "-- °C",
        descripcion: "No se pudo cargar el clima",
        icono: "01d"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaburguaClima();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.blurWrapper}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <Text style={styles.title} numberOfLines={1}>
            Clima Local
          </Text>

          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : clima ? (
            <View style={styles.info}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${clima.icono}@2x.png`
                }}
                style={styles.icon}
              />
              <View style={styles.textGroup}>
                <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
                  {clima.ciudad} · {clima.temperatura}
                </Text>
                <Text style={styles.subtext} numberOfLines={1}>
                  {clima.descripcion}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.text}>Sin conexión a Internet</Text>
          )}
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "92%",
    marginVertical: 10,
    alignItems: "center"
  },
  blurWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%"
  },
  container: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginRight: 10
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textGroup: {
    flex: 1
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  subtext: {
    color: "#ddd",
    fontSize: 13
  },
  icon: {
    width: 38,
    height: 38,
    marginRight: 8
  }
});