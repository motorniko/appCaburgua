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
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  normalizarImagen,
  esUrlSegura,
  limpiarTelefono,
  esColorClaro,
} from "./utils";

const COLUMNAS = 3;

function normalizarEnlace(valor) {
  const limpio = String(valor || "").trim();
  if (!limpio) return "";
  if (/^https?:\/\//i.test(limpio)) return limpio;
  return `https://${limpio}`;
}

function enmascararUrl(valor) {
  return String(valor || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0];
}

function obtenerIconoRedSocial(nombreRed) {
  const red = String(nombreRed || "").trim().toLowerCase();
  if (!red) return "share-variant";
  if (red.includes("facebook") || red === "fb") return "facebook";
  if (red.includes("tiktok")) return "music-note";
  if (red.includes("youtube") || red.includes("yt")) return "youtube";
  if (red.includes("whatsapp") || red.includes("wa")) return "whatsapp";
  if (red.includes("twitter") || red === "x") return "twitter";
  if (red.includes("linkedin")) return "linkedin";
  return "share-variant";
}

export default function ColaboradoresTemplate({
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

  // Ubicación: solo se muestra el botón si hay coordenadas válidas
  const lat = Number(coordenadas?.lat);
  const lng = Number(coordenadas?.lng);
  const tieneUbicacion =
    Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  // Abre directo y captura el error (canOpenURL no es fiable en Android 11+/iOS)
  const abrirUrl = async (url, mensajeError) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("No se pudo abrir", mensajeError);
    }
  };

  const abrirConApp = (app) => {
    setModalVisible(false);
    abrirUrl(
      app === "maps" ? mapsUrl : wazeUrl,
      `No se pudo abrir ${app === "maps" ? "Google Maps" : "Waze"}.`
    );
  };

  const abrirEnlaceExterno = (rawUrl, fallbackTexto = "") => {
    const candidata = normalizarEnlace(rawUrl || fallbackTexto);
    if (!candidata || !esUrlSegura(candidata)) {
      Alert.alert("Sin enlace", "No hay un enlace válido configurado.");
      return;
    }
    abrirUrl(candidata, "No se puede abrir el enlace.");
  };

  const abrirCorreo = (correo) => {
    const limpio = String(correo || "").trim();
    if (!limpio) return;
    abrirUrl(`mailto:${limpio}`, "No se pudo abrir la aplicación de correo.");
  };

  const llamar = (numero) => {
    const tel = limpiarTelefono(numero);
    if (!tel) return;
    abrirUrl(`tel:${tel}`, "No se pudo iniciar la llamada.");
  };

  // Galería: se rellena la última fila para que no se estiren los ítems
  const fotos = Array.isArray(galeria) ? galeria.filter(Boolean) : [];
  const relleno = (COLUMNAS - (fotos.length % COLUMNAS)) % COLUMNAS;
  const dataGaleria = [...fotos, ...Array(relleno).fill(null)];

  const renderItem = ({ item, index }) => {
    if (!item) return <View style={styles.galleryPlaceholder} />;
    const itemSource = normalizarImagen(item);
    return (
      <TouchableOpacity
        style={[
          styles.galleryItem,
          { transform: [{ rotateZ: index % 2 === 0 ? "-3deg" : "3deg" }] },
        ]}
        onPress={() => setSelectedImage(item)}
        activeOpacity={0.9}
        accessibilityRole="imagebutton"
        accessibilityLabel={`Ver foto ${index + 1}`}
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

  const telefono = String(contacto?.telefono || "").trim();
  const instagram = String(contacto?.instagram || "").trim();
  const igUrl = String(instagramUrl || contacto?.instagramUrl || "").trim();
  const email = String(contacto?.email || "").trim();
  const sitioWeb = String(contacto?.sitioWeb || contacto?.sitio_web || "").trim();
  const sitioWebTexto =
    String(contacto?.sitioWebTexto || "").trim() || enmascararUrl(sitioWeb);
  const otraRed = String(contacto?.otraRed || contacto?.otra_red || "").trim();
  const otraRedUrl = String(contacto?.otraRedUrl || contacto?.otra_red_url || "").trim();

  const mostrarInstagram = !!(igUrl || instagram);
  const mostrarOtraRed = !!(otraRed || otraRedUrl);
  const tieneContacto = !!(
    telefono ||
    mostrarInstagram ||
    email ||
    sitioWeb ||
    mostrarOtraRed
  );

  return (
    <ScrollView
      style={{ backgroundColor: colorFondo }}
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 28,
      }}
    >
      <View style={styles.container}>
        <StatusBar style={esColorClaro(colorFondo) ? "dark" : "light"} />
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="Volver"
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
          <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
            {title}
          </Text>
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
        {fotos.length > 0 && (
          <View style={[styles.gallerySection, { backgroundColor: colorFondo }]}>
            <Text style={styles.galeriTitle}>Fotos</Text>
            <FlatList
              data={dataGaleria}
              keyExtractor={(_, i) => String(i)}
              renderItem={renderItem}
              numColumns={COLUMNAS}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
            />
          </View>
        )}

        {/* MODAL FULLSCREEN */}
        <Modal
          visible={!!selectedImage}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
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
              accessibilityRole="button"
              accessibilityLabel="Cerrar foto"
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
            (valores || []).map((v, i) => (
              <Text key={i} style={styles.text}>
                {v}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Sin información de valores</Text>
          )}
        </View>

        {/* CONTACTO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contactos:</Text>

          {telefono ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="phone"
                size={22}
                color={colorPrincipal}
              />
              <TouchableOpacity
                onPress={() => llamar(telefono)}
                accessibilityRole="link"
                accessibilityLabel={`Llamar al ${telefono}`}
              >
                <Text style={[styles.text, styles.link]}>{telefono}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {mostrarInstagram ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="instagram"
                size={22}
                color={colorPrincipal}
              />
              {igUrl ? (
                <TouchableOpacity
                  onPress={() => abrirEnlaceExterno(igUrl)}
                  accessibilityRole="link"
                >
                  <Text style={[styles.text, styles.link]}>
                    {instagram || igUrl}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text}>{instagram}</Text>
              )}
            </View>
          ) : null}

          {email ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="email"
                size={22}
                color={colorPrincipal}
              />
              <TouchableOpacity
                onPress={() => abrirCorreo(email)}
                accessibilityRole="link"
                accessibilityLabel={`Enviar correo a ${email}`}
              >
                <Text style={[styles.text, styles.link]}>{email}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {sitioWeb ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name="web"
                size={22}
                color={colorPrincipal}
              />
              <TouchableOpacity
                onPress={() => abrirEnlaceExterno(sitioWeb)}
                accessibilityRole="link"
                accessibilityLabel={`Abrir sitio web ${sitioWebTexto}`}
              >
                <Text style={[styles.text, styles.link]}>{sitioWebTexto}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {mostrarOtraRed ? (
            <View style={styles.itemRow}>
              <MaterialCommunityIcons
                name={obtenerIconoRedSocial(otraRed)}
                size={22}
                color={colorPrincipal}
              />
              {otraRedUrl ? (
                <TouchableOpacity
                  onPress={() => abrirEnlaceExterno(otraRedUrl)}
                  accessibilityRole="link"
                >
                  <Text style={[styles.text, styles.link]}>
                    {otraRed || otraRedUrl}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text}>{otraRed}</Text>
              )}
            </View>
          ) : null}

          {!tieneContacto ? (
            <Text style={styles.text}>Sin información de contacto</Text>
          ) : null}
        </View>

        {/* UBICACIÓN */}
        {tieneUbicacion && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
            accessibilityRole="button"
          >
            <MaterialCommunityIcons
              name="map-marker"
              size={22}
              color={colorPrincipal}
            />
            <Text style={[styles.buttonText, { color: colorPrincipal }]}>
              Ver ubicación
            </Text>
          </TouchableOpacity>
        )}

        {/* MODAL APPS */}
        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
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
  container: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
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
  header: { width: "100%", alignItems: "center", marginBottom: 15 },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 4,
  },
  title: {
    fontSize: 45,
    fontFamily: "Jungle",
    color: "#fff",
    textAlign: "center",
  },
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
  link: { color: "#007AFF", textDecorationLine: "underline" },
  gallerySection: {
    width: "100%",
    borderRadius: 30,
    padding: 12,
    marginTop: 15,
    elevation: 3,
    borderWidth: 2,
    borderColor: "white",
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
  },
  galleryPlaceholder: { width: "32%", aspectRatio: 1, marginBottom: 10 },
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