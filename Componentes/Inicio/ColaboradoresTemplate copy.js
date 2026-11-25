import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const normalizarImagen = (src) => {
  if (!src) return null;
  return typeof src === "string" ? { uri: src } : src;
};

export default function ColaboradoresTemplate({
  id,
  title = "",
  description = "",
  servicios = [],
  imagenLogo = null,
  galeria = [],
  horario = [],
  valores = [],
  contacto = {},
  instagramUrl = "",
  coordenadas = { lat: 0, lng: 0 },
  colorFondo = "#B22222",
  colorPrincipal = "#00008B",
  colorLogo = "transparent",
}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const logoSource = normalizarImagen(imagenLogo);
  const imagenSeleccionadaSource = normalizarImagen(selectedImage);

  const { lat, lng } = coordenadas || { lat: 0, lng: 0 };
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  const abrirConApp = async (app) => {
    const url = app === "maps" ? mapsUrl : wazeUrl;
    const puedeAbrir = await Linking.canOpenURL(url);
    if (puedeAbrir) await Linking.openURL(url);
    else alert(`No se pudo abrir ${app === "maps" ? "Google Maps" : "Waze"}.`);
    setModalVisible(false);
  };

  const verificarApps = async () => {
    const puedeMaps = await Linking.canOpenURL("https://maps.google.com");
    const puedeWaze = await Linking.canOpenURL("https://waze.com");
    if (puedeMaps && puedeWaze) setModalVisible(true);
    else if (puedeMaps) Linking.openURL(mapsUrl);
    else if (puedeWaze) Linking.openURL(wazeUrl);
    else alert("No se encontró una app de mapas instalada.");
  };

  const abrirSitioWeb = async () => {
    if (!instagramUrl) {
      alert("No hay enlace configurado.");
      return;
    }
    const soportado = await Linking.canOpenURL(instagramUrl);
    if (soportado) Linking.openURL(instagramUrl);
    else alert("No se puede abrir el enlace: " + instagramUrl);
  };

  const llamar = async (numero) => {
    const url = `tel:${numero}`;
    const soportado = await Linking.canOpenURL(url);
    if (soportado) Linking.openURL(url);
    else console.error("Error al intentar llamar");
  };

  const renderItem = ({ item, index }) => {
    const itemSource = normalizarImagen(item);
    return (
      <TouchableOpacity
        style={[
          styles.galleryItem,
          {
            transform: [
              { scale: 1 },
              { rotateZ: `${index % 2 === 0 ? "-3deg" : "3deg"}` },
            ],
          },
        ]}
        onPress={() => setSelectedImage(item)}
        activeOpacity={0.9}
      >
        {itemSource && (
          <Image
            source={itemSource}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        {
          backgroundColor: colorFondo,
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 28,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* HEADER */}
        <View style={styles.header}>
          {logoSource && (
            <Image
              source={logoSource}
              style={[styles.logo, { borderColor: colorLogo || "transparent" }]}
            />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* DESCRIPCIÓN */}
        <Text style={styles.description}>{description}</Text>

        {/* SERVICIOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios:</Text>
          {(servicios || []).map((servicio, index) => (
            <View
              key={`${servicio.icon || "check"}-${index}`}
              style={styles.itemRow}
            >
              <MaterialCommunityIcons
                name={servicio.icon || "check"}
                size={22}
                color={colorPrincipal}
              />
              <Text style={styles.text}>{servicio.text}</Text>
            </View>
          ))}
        </View>

        {/* GALERÍA */}
        <View style={[styles.gallerySection, { backgroundColor: colorFondo }]}>
          <Text style={styles.galeriTitle}>Fotos</Text>
          <FlatList
            data={galeria || []}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
          />
        </View>

        {/* MODAL FULLSCREEN */}
        <Modal visible={!!selectedImage} transparent animationType="fade">
          <TouchableOpacity
            style={styles.fullscreenContainer}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            {imagenSeleccionadaSource && (
              <Image
                source={imagenSeleccionadaSource}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={[styles.closeButton, { top: insets.top + 16 }]}
              onPress={() => setSelectedImage(null)}
            >
              <MaterialCommunityIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        {/* HORARIOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horario de atención:</Text>
          {(horario || []).length ? (
            (horario || []).map((h, i) => (
              <Text key={i} style={styles.text}>
                {h}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Sin información de horarios</Text>
          )}
        </View>

        {/* VALORES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valores:</Text>
          {(valores || []).length ? (
            (valores || []).map((h, i) => (
              <Text key={i} style={styles.text}>
                {h}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Sin información de valores</Text>
          )}
        </View>

        {/* CONTACTO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contactos:</Text>
          {contacto?.telefono ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="phone"
                size={22}
                color={colorPrincipal}
              />
              <TouchableOpacity onPress={() => llamar(contacto.telefono)}>
                <Text
                  style={[
                    styles.text,
                    { color: "#007AFF", textDecorationLine: "underline" },
                  ]}
                >
                  {contacto.telefono}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.itemRow}>
            <MaterialCommunityIcons name="web" size={22} color={colorPrincipal} />
            <TouchableOpacity onPress={abrirSitioWeb}>
              <Text
                style={[
                  styles.text,
                  { color: "#007AFF", textDecorationLine: "underline" },
                ]}
              >
                {contacto?.instagram || "Sitio / Instagram"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UBICACIÓN */}
        <TouchableOpacity style={styles.button} onPress={verificarApps}>
          <MaterialCommunityIcons
            name="map-marker"
            size={22}
            color={colorPrincipal}
          />
          <Text style={[styles.buttonText, { color: colorPrincipal }]}>
            Ver ubicación
          </Text>
        </TouchableOpacity>

        {/* MODAL APPS */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={[styles.modalTitle, { color: colorPrincipal }]}>
                Abrir con:
              </Text>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => abrirConApp("maps")}
              >
                <MaterialCommunityIcons
                  name="google-maps"
                  size={22}
                  color={colorPrincipal}
                />
                <Text style={styles.modalBtnText}>Google Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => abrirConApp("waze")}
              >
                <MaterialCommunityIcons
                  name="waze"
                  size={22}
                  color={colorPrincipal}
                />
                <Text style={styles.modalBtnText}>Waze</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {},
  container: { paddingHorizontal: 20, alignItems: "center" },
  topBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderRadius: 20,
    padding: 6,
  },
  header: { alignItems: "center", marginBottom: 15 },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 4,
  },
  title: { fontSize: 45, fontFamily: "Jungle", color: "#fff" },
  description: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    paddingHorizontal: 10,
  },
  section: {
    width: "100%",
    marginTop: 23,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontFamily: "Jungle",
    fontSize: 22,
    color: "black",
    marginBottom: 12,
  },
  galeriTitle: {
    fontFamily: "Jungle",
    fontSize: 30,
    color: "white",
    marginBottom: 12,
  },
  itemRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  text: { marginLeft: 8, fontSize: 17, fontWeight: "bold", color: "black" },
  gallerySection: {
    width: "100%",
    borderRadius: 30,
    padding: 12,
    marginTop: 15,
    elevation: 3,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#00008B",
    alignItems: "center",
  },
  row: { justifyContent: "space-between" },
  galleryItem: {
    width: "32%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    padding: 4,
    elevation: 5,
  },
  galleryImage: { width: "100%", height: "100%", borderRadius: 20 },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: { width: "90%", height: "80%" },
  closeButton: { position: "absolute", right: 30 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 20,
  },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold", marginLeft: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 250,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00008B",
    marginBottom: 10,
  },
  modalBtn: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  modalBtnText: { marginLeft: 8, fontSize: 16, color: "#333" },
  cancelText: { color: "red", marginTop: 10 },
});