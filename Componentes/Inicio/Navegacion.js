/* import React, { useState, useEffect, useCallback, useRef } from "react";
import { ActivityIndicator, View, AppState } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppPrincipal } from "../../AppPrincipal";
import Wrapper from "./Wrapper";
import { LugaresContext } from "./LugaresContext";

const Stack = createNativeStackNavigator();
const API_URL = "https://api-caburgua.albertolagos59.workers.dev/categorias/export";

const getScreenFromLugar = (lugar) => {
  if (lugar.screen === "EmergenciasScreen") {
    return {
      componentName: "Emergencias",
      props: {},
    };
  }

  return {
    componentName: "ListaItems",
    props: {
      categoriaId: lugar.id,
      titulo: lugar.title,
      colorBase: lugar.color || "#00008B",
    },
  };
};

export default function Navegacion() {
  const [loading, setLoading] = useState(true);
  const [lugaresData, setLugaresData] = useState([]);
  const appState = useRef(AppState.currentState);
  const ultimaCarga = useRef(0);
  const cargaEnCurso = useRef(false);

  const fetchLugaresData = useCallback(async ({ silencioso = false } = {}) => {
    if (cargaEnCurso.current) return;
    cargaEnCurso.current = true;
    try {
      if (!silencioso) setLoading(true);
      const response = await fetch(API_URL, {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLugaresData(Array.isArray(data) ? data : []);
      ultimaCarga.current = Date.now();
    } catch (error) {
      console.error("Error cargar lugares:", error);
    } finally {
      if (!silencioso) setLoading(false);
      cargaEnCurso.current = false;
    }
  }, []);

  useEffect(() => {
    fetchLugaresData({ silencioso: false });

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const volvioActiva =
        appState.current.match(/inactive|background/) &&
        nextAppState === "active";
      appState.current = nextAppState;

      if (volvioActiva && Date.now() - ultimaCarga.current > 15000) {
        fetchLugaresData({ silencioso: true });
      }
    });

    return () => subscription.remove();
  }, [fetchLugaresData]);

  if (loading && lugaresData.length === 0) {
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

  const lugaresActivos = lugaresData.filter((l) => l.enable);
  const lugaresConPantalla = lugaresActivos.filter(
    (lugar) => getScreenFromLugar(lugar) !== null
  );

  return (
    <LugaresContext.Provider
      value={{
        lugaresActivos,
        loading,
        refrescarLugares: () => fetchLugaresData({ silencioso: true }),
      }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Inicio"
            component={AppPrincipal}
          />

          {lugaresConPantalla.map((lugar) => {
            const screenConfig = getScreenFromLugar(lugar);
            return (
              <Stack.Screen
                key={lugar.id}
                name={lugar.title}
                component={Wrapper}
                initialParams={{
                  componentName: screenConfig.componentName,
                  props: screenConfig.props,
                }}
              />
            );
          })}

          <Stack.Screen
            name="DetalleColaborador"
            component={Wrapper}
            initialParams={{
              componentName: "ColaboradoresTemplate",
              props: {},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LugaresContext.Provider>
  );
} */


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