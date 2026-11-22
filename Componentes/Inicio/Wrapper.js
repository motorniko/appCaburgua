import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ComponentRegistry } from "./ComponentRegistry";

export default function Wrapper({ route }) {
  const { componentName, props = {}, item } = route?.params || {};
  const Component = ComponentRegistry[componentName];

  if (!Component) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>
          Error: pantalla "{componentName || "desconocida"}" no encontrada.
        </Text>
      </View>
    );
  }

  const mergedProps = item && typeof item === "object" ? { ...props, ...item } : props;
  return <Component {...mergedProps} />;
}

const styles = StyleSheet.create({
  error: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red" },
});