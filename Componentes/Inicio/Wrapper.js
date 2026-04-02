import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ComponentRegistry } from "./ComponentRegistry";

export default function Wrapper({ route }) {
  const { componentName, props } = route.params;

  // ✅ Busca el componente por nombre en el registro
  const Component = ComponentRegistry[componentName];

  if (!Component) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Error: pantalla "{componentName}" no encontrada.</Text>
      </View>
    );
  }

  return <Component {...props} />;
}

const styles = StyleSheet.create({
  error: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red' },
});