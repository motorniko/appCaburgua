import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppPrincipal } from "../../AppPrincipal";
import Wrapper from "./Wrapper";

// ✅ Context en archivo separado, elimina el require cycle
import { LugaresContext } from "./LugaresContext";

const Stack = createNativeStackNavigator();

const getScreenFromLugar = (lugar) => {
  if (Array.isArray(lugar.items) && lugar.items.length > 0) {
    return {
      componentName: "ListaItems", // ✅ string en vez de función
      props: {
        titulo: lugar.title,
        data: lugar.items.filter(i => i.enable),
      },
    };
  }
  if (lugar.screen === "EmergenciasScreen") {
    return {
      componentName: "Emergencias", // ✅ string en vez de función
      props: {},
    };
  }
  return null;
};

export default function Navegacion() {
  const [loading, setLoading] = useState(false);
  const [lugaresData, setLugaresData] = useState([]);

  const fetchLugaresData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api-caburgua.services.syntaxit.cl/api/v1/categorias/export"
      );
      const data = await response.json();
      setLugaresData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargar lugares:", error);
      setLugaresData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLugaresData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const lugaresActivos = lugaresData.filter(l => l.enable);

  const lugaresConPantalla = lugaresActivos.filter(
    (lugar) => getScreenFromLugar(lugar) !== null
  );

  const itemsActivos = lugaresActivos.flatMap((lugar) =>
    Array.isArray(lugar.items) ? lugar.items.filter((item) => item.enable) : []
  );

  return (
    // ✅ Provee los datos sin causar ciclo de dependencias
    <LugaresContext.Provider value={lugaresActivos}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Inicio"
            component={AppPrincipal}
            options={{ headerShown: false }}
          />

          {lugaresConPantalla.map((lugar) => {
            const screenConfig = getScreenFromLugar(lugar);
            return (
              <Stack.Screen
                key={lugar.id}
                name={lugar.title}
                component={Wrapper}
                initialParams={{
                  componentName: screenConfig.componentName, // ✅ string serializable
                  props: screenConfig.props,
                }}
              />
            );
          })}

          {itemsActivos.map((item) => (
            <Stack.Screen
              key={item.id}
              name={item.title}
              component={Wrapper}
              initialParams={{
                componentName: "ColaboradoresTemplate", // ✅ string serializable
                props: item,
              }}
            />
          ))}

        </Stack.Navigator>
      </NavigationContainer>
    </LugaresContext.Provider>
  );
}