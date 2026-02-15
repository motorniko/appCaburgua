import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppPrincipal } from "../../AppPrincipal";
import ListaItems from "../Items/PrincipalItems";
import ColaboradoresTemplate from "./ColaboradoresTemplate";
import { Emergencias } from "../Items/Emergencias";
import Wrapper from "./Wrapper";

const Stack = createNativeStackNavigator();

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
      setLugaresData(data);
    } catch (error) {
      console.error("Error cargar lugares:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLugaresData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  const lugares = lugaresData.filter((item) => item.enable);

  const itemsActivos = lugares.flatMap((lugar) =>
    Array.isArray(lugar.items)
      ? lugar.items.filter((item) => item.enable)
      : []
  );

  const getScreenFromLugar = (lugar) => {
    if (Array.isArray(lugar.items)) {
      return {
        component: ListaItems,
        props: {
          titulo: lugar.title,
          data: lugar.items,
        },
      };
    }

    if (lugar.screen === "EmergenciasScreen") {
      return {
        component: Emergencias,
        props: {},
      };
    }

    return null;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={AppPrincipal}
          options={{ headerShown: false }}
        />

        {lugares.map((lugar) => {
          const screenConfig = getScreenFromLugar(lugar);
          if (!screenConfig) return null;

          const { component, props } = screenConfig;

          return (
            <Stack.Screen
              key={lugar.id}
              name={lugar.title}
              component={Wrapper}
              initialParams={{ component, props }}
            />
          );
        })}

        {itemsActivos.map((item) => (
          <Stack.Screen
            key={item.id}
            name={item.title}
            component={Wrapper}
            initialParams={{
              component: ColaboradoresTemplate,
              props: item,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
