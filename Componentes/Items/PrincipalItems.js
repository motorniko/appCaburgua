
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLugares } from "../Inicio/LugaresContext";
import { conAlpha } from "../Inicio/utils";
import { ScrimBarraEstado } from "../Inicio/ScrimBarraEstado";

const fondoDefault = require("../../assets/fondo.png");

export default function ListaItems({
  categoriaId = null,
  titulo = "",
  data = [],
  colorBase = "#00008B",
  fondo = null,
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { lugaresActivos, refrescarLugares } = useLugares();
  const [refreshing, setRefreshing] = useState(false);

  // El throttle está dentro del provider, aquí solo se pide el refresco
  useFocusEffect(
    useCallback(() => {
      refrescarLugares();
    }, [refrescarLugares])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refrescarLugares({ forzar: true });
    } finally {
      setRefreshing(false);
    }
  }, [refrescarLugares]);

  const categoriaActual =
    categoriaId != null
      ? lugaresActivos.find((l) => l.id === categoriaId)
      : null;
  const categoriaNoDisponible = categoriaId != null && !categoriaActual;

  let itemsVigentes = data;
  if (categoriaActual) {
    itemsVigentes = Array.isArray(categoriaActual.items)
      ? categoriaActual.items.filter((i) => i.enable)
      : [];
  } else if (categoriaNoDisponible) {
    itemsVigentes = [];
  }

  const tituloVigente = categoriaActual?.title || titulo;
  const colorVigente = categoriaActual?.color || colorBase;

  const fondoSource = fondo
    ? typeof fondo === "string"
      ? { uri: fondo }
      : fondo
    : fondoDefault;

  const renderItems = (lista) =>
    lista.map((item) => {
      const color = item.colorPrincipal || colorVigente;
      return (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, { borderColor: color, borderWidth: 3 }]}
          onPress={() => navigation.navigate("DetalleColaborador", { item })}
          accessibilityRole="button"
          accessibilityLabel={item.title}
        >
          <LinearGradient
            colors={[conAlpha(color, "cc"), conAlpha(color, "80")]}
            style={styles.gradient}
          >
            <View style={styles.row}>
              {!!item.icon && (
                <MaterialCommunityIcons
                  name={item.icon}
                  size={45}
                  color="#fff"
                  style={{ marginRight: 15 }}
                />
              )}
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle} numberOfLines={1} maxFontSizeMultiplier={1.2}>
                  {item.title}
                </Text>
                <Text style={styles.itemDesc} numberOfLines={2} maxFontSizeMultiplier={1.2}>
                  {item.description}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    });

  return (
    <ImageBackground
      source={fondoSource}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + 28 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        <View style={[styles.overlay, { paddingTop: insets.top + 12 }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel="Volver"
            >
              <MaterialCommunityIcons name="arrow-left" size={30} color="#fff" />
            </TouchableOpacity>
            <Text
              style={styles.sectionTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {tituloVigente}
            </Text>
          </View>

          <View style={styles.grid}>
            {itemsVigentes.length > 0 ? (
              renderItems(itemsVigentes)
            ) : (
              <Text style={styles.emptyText}>
                {categoriaNoDisponible
                  ? "Esta categoría ya no está disponible."
                  : "No hay elementos disponibles por ahora."}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <ScrimBarraEstado />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerRow: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backBtn: {
    marginRight: 10,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
    padding: 6,
  },
  sectionTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 35,
    fontFamily: "Jungle",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  grid: { width: "95%" },
  item: {
    width: "100%",
    height: 80,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  row: { flexDirection: "row", alignItems: "center" },
  textContainer: { flex: 1 },
  itemTitle: {
    fontFamily: "Jungle",
    fontSize: 25,
    color: "#fff",
    marginLeft: 10,
  },
  itemDesc: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 24,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});