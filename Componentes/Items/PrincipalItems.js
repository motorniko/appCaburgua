import React, { useState, useCallback, useRef } from "react";
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
import { BlurView } from "expo-blur";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useLugares } from "../Inicio/LugaresContext";

const fondoDefault = require("../../assets/fondo.png");

export default function ListaItems({
  categoriaId = null,
  titulo = "",
  data = [],
  colorBase = "#00008B",
  fondo = null,
}) {
  const navigation = useNavigation();
  const { lugaresActivos, refrescarLugares } = useLugares();
  const [refreshing, setRefreshing] = useState(false);
  const ultimoFocus = useRef(0);

  // Sincroniza en silencio al entrar o volver a la categoría (máx. 1 vez cada 10s)
  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimoFocus.current > 10000) {
        ultimoFocus.current = Date.now();
        refrescarLugares();
      }
    }, [refrescarLugares])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refrescarLugares();
    ultimoFocus.current = Date.now();
    setRefreshing(false);
  }, [refrescarLugares]);

  const categoriaActual = categoriaId
    ? lugaresActivos.find((l) => l.id === categoriaId)
    : null;

  const itemsVigentes = categoriaActual
    ? Array.isArray(categoriaActual.items)
      ? categoriaActual.items.filter((i) => i.enable)
      : []
    : data;

  const tituloVigente = categoriaActual?.title || titulo;
  const colorVigente = categoriaActual?.color || colorBase;

  const fondoSource = fondo
    ? typeof fondo === "string"
      ? { uri: fondo }
      : fondo
    : fondoDefault;

  const renderItems = (lista) =>
    lista.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.item,
          { borderColor: item.colorPrincipal || colorVigente, borderWidth: 3 },
        ]}
        onPress={() => navigation.navigate("DetalleColaborador", { item })}
      >
        <LinearGradient
          colors={[
            `${item.colorPrincipal || colorVigente}cc`,
            `${item.colorPrincipal || colorVigente}80`,
          ]}
          style={styles.gradient}
        >
          <View style={styles.row}>
            {item.icon && (
              <MaterialCommunityIcons
                name={item.icon}
                size={45}
                color="#fff"
                style={{ marginRight: 15 }}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    ));

  return (
    <ImageBackground
      source={fondoSource}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <View style={styles.overlay}>
          <Text style={styles.sectionTitle}>- {tituloVigente}</Text>
          <View style={styles.grid}>{renderItems(itemsVigentes)}</View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, alignItems: "center", paddingVertical: 20 },
  scrollContainer: { paddingBottom: 40 },
  sectionTitle: {
    width: "92%",
    textAlign: "left",
    fontSize: 35,
    fontFamily: "Jungle",
    color: "#fff",
    marginTop: 10,
    marginBottom: 15,
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
    fontSize: 17,
    color: "#fff",
    marginLeft: 10,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});