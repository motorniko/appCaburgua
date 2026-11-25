/* import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useLugares } from './LugaresContext';

export function Directorio() {
  const navigation = useNavigation();
  const { lugaresActivos } = useLugares();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {lugaresActivos.length === 0 && (
          <Text style={styles.emptyText}>No hay categorías disponibles</Text>
        )}

        {lugaresActivos.map((lugar) => (
          <TouchableOpacity
            key={lugar.id}
            style={[
              styles.item,
              { borderColor: lugar.color || '#000', borderWidth: 3 }
            ]}
            onPress={() => navigation.navigate(lugar.title)}
          >
            <LinearGradient
              colors={[
                `${lugar.color || '#000'}cc`,
                `${lugar.color || '#000'}80`
              ]}
              style={styles.gradient}
            >
              <MaterialCommunityIcons
                name={lugar.icon || "help-circle"}
                size={54}
                color="#fff"
              />
              <Text
                style={styles.itemTitle}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {lugar.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '95%',
  },
  item: {
    width: '31%',
    height: 94,
    marginBottom: 11,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  itemTitle: {
    marginTop: 5,
    fontFamily: 'Jungle',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 12,
  },
}); */




import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useLugares } from "./LugaresContext";
import { conAlpha } from "./utils";

const COLUMNAS = 3;

export function Directorio() {
  const navigation = useNavigation();
  const { lugaresActivos, error } = useLugares();

  const abrir = (lugar) => {
    if (lugar.screen === "EmergenciasScreen") {
      navigation.navigate("Emergencias");
      return;
    }
    navigation.navigate("Categoria", {
      props: {
        categoriaId: lugar.id,
        titulo: lugar.title,
        colorBase: lugar.color || "#00008B",
      },
    });
  };

  // Rellena la última fila para que no se estiren los ítems a los extremos
  const relleno =
    (COLUMNAS - (lugaresActivos.length % COLUMNAS)) % COLUMNAS;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {lugaresActivos.length === 0 && (
          <Text style={styles.emptyText}>
            {error
              ? "Sin conexión. Desliza hacia abajo para reintentar."
              : "No hay categorías disponibles"}
          </Text>
        )}

        {lugaresActivos.map((lugar) => {
          const color = lugar.color || "#000";
          return (
            <TouchableOpacity
              key={lugar.id}
              style={[styles.item, { borderColor: color, borderWidth: 3 }]}
              onPress={() => abrir(lugar)}
              accessibilityRole="button"
              accessibilityLabel={lugar.title}
            >
              <LinearGradient
                colors={[conAlpha(color, "cc"), conAlpha(color, "80")]}
                style={styles.gradient}
              >
                <MaterialCommunityIcons
                  name={lugar.icon || "help-circle"}
                  size={54}
                  color="#fff"
                />
                <Text
                  style={styles.itemTitle}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  maxFontSizeMultiplier={1.2}
                >
                  {lugar.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        {Array.from({ length: relleno }).map((_, i) => (
          <View key={`relleno-${i}`} style={styles.relleno} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "95%",
  },
  item: {
    width: "31%",
    height: 94,
    marginBottom: 11,
    borderRadius: 15,
    overflow: "hidden",
  },
  relleno: { width: "31%", height: 0 },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  itemTitle: {
    marginTop: 5,
    fontFamily: "Jungle",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    width: "100%",
    paddingVertical: 12,
  },
});