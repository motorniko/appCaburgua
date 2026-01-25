import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { BlurView } from "expo-blur";

export function Clima() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);

  const OPENWEATHER_API_KEY = "952748bdde358938380085e61c82ec8f";
  const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

  const fetchOw = async () => {

    try {
      setLoading(true)
      const payload = {
        "q": "Caburgua,CL",  // Usar nombre ciudad
        "appid": OPENWEATHER_API_KEY,
        "units": "metric",
        "lang": "es"
      }

      const queryString = new URLSearchParams(payload).toString();
      const url = `${OPENWEATHER_BASE_URL}?${queryString}`;
      const response = await fetch(url);
      const data = await response.json();
      const parse = {
        "ciudad": data.get?.("name") || "Caburgua",
        "temperatura": data.main.temp,
        "descripcion": data.weather[0].description,
        "icono": data.weather[0].icon,
      }
      setClima(parse);
    } catch (e) {
      console.error("Error cargando clima:",e);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchOw();
  }, [ ]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.blurWrapper}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <Text style={styles.title}>Clima Local:</Text>
            { loading 
              ? (
                <ActivityIndicator color="#fff" />
              ) 
              : clima 
                ? (
                  <View style={styles.info}>
                    <Image
                      source={{
                        uri: `http://openweathermap.org/img/wn/${clima.icono}@2x.png`,
                      }}
                      style={styles.icon}
                    />
                    <Text style={styles.text}>
                      {clima.descripcion} | {Math.round(clima.temperatura)}°C
                    </Text>
                  </View>
                ) 
                : (
                  <Text style={styles.text}>Sin conexion a Internet</Text>
                )
            }
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
    alignItems: "center",
  },
  blurWrapper: {
    borderRadius: 15,
    overflow: "hidden", //hace que BlurView respete las esquinas
    width: "100%",
  },
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10%", // se adapta al ancho
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginRight: 5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
