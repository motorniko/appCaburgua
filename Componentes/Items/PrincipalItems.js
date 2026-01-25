
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

export default function ListaItems({
  titulo = "",
  data = [],
  colorBase = "#00008B",
  fondo = require("../../assets/fondo.png"),
}) {
  const navigation = useNavigation();

  const renderItems = (lista) =>
    lista.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={[styles.item, { borderColor: item.colorPrincipal || colorBase, borderWidth: 3 }]}
        onPress={() => navigation.navigate(item.title)}
      >
        <LinearGradient
          colors={[`${item.colorPrincipal || colorBase}cc`, `${item.colorPrincipal || colorBase}80`]}
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
    <ImageBackground source={fondo} style={styles.background} resizeMode="cover">
      <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <Text style={styles.sectionTitle}>- {titulo}</Text>
          <View style={styles.grid}>{renderItems(data)}</View>
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

  row: {
     flexDirection: "row", alignItems: "center" 
    },

  textContainer: { 
    flex: 1 
  },

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
