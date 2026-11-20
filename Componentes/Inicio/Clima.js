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
        "https://api-caburgua-app.albertolagos59.workers.dev/clima"
      );

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

          <Text style={styles.title}>Clima Local</Text>

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
              <View>
                <Text style={styles.text}>
                  {clima.ciudad} · {clima.temperatura}
                </Text>
                <Text style={styles.subtext}>
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
    marginBottom: 35,
    width: "90%",
    marginVertical: 15,
    alignItems: "center"
  },
  blurWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%"
  },
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10%"
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginRight: 15
  },
  info: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 18
  },
  subtext: {
    color: "#ddd",
    fontSize: 14
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10
  }
});
