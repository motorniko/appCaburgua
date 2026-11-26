
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppPrincipal } from "../../AppPrincipal";
import Wrapper from "./Wrapper";
import { LugaresProvider, useLugares } from "./LugaresContext";

const Stack = createNativeStackNavigator();

function Contenido() {
  const { cargado } = useLugares();

  if (!cargado) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0b1d26",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={AppPrincipal} />

        {/* Pantallas fijas: ya no dependen del título que venga del backend */}
        <Stack.Screen
          name="Categoria"
          component={Wrapper}
          initialParams={{ componentName: "ListaItems", props: {} }}
        />
        <Stack.Screen
          name="Emergencias"
          component={Wrapper}
          initialParams={{ componentName: "Emergencias", props: {} }}
        />
        <Stack.Screen
          name="DetalleColaborador"
          component={Wrapper}
          initialParams={{ componentName: "ColaboradoresTemplate", props: {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Navegacion() {
  return (
    <LugaresProvider>
      <Contenido />
    </LugaresProvider>
  );
}