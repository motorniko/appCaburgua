// esta es la nevagcion entres pantallas
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppPrincipal } from '../../AppPrincipal';
import ListaItems from '../Items/PrincipalItems';
import { lugaresData } from '../../data/LugaresData';
import ColaboradoresTemplate from './ColaboradoresTemplate';
import { Emergencias } from '../Items/Emergencias';
import Wrapper from './Wrapper';

const Stack = createNativeStackNavigator();

export default function Navegacion() {

  const lugares = lugaresData.filter(item => item.enable);

  const itemsActivos = lugares.flatMap(
    lugar => (lugar.items ? lugar.items.filter(item => item.enable) : [])
  );

  const getScreenFromLugar = (lugar) => {
    if (Array.isArray(lugar.items)) {
      return {
        component: ListaItems,
        props: {
          titulo: lugar.title,
          data: lugar.items
        }
      };
    }

    if (lugar.screen === "EmergenciasScreen") {
      return {
        component: Emergencias,
        props: {}
      };
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Inicio */}
        <Stack.Screen
          name="Inicio"
          component={AppPrincipal}
          options={{ headerShown: false }}
        />

        {/* Categorías principales */}
        {lugares.map((lugar) => {
          const { component, props } = getScreenFromLugar(lugar);

          return (
            <Stack.Screen
              key={lugar.id}
              name={lugar.title}
              component={Wrapper}
              initialParams={{ component, props }}
            />
          );
        })}

        {/* Pantallas de items */}
        {itemsActivos.map((item) => (
          <Stack.Screen
            key={item.id}
            name={item.title}
            component={Wrapper}
            initialParams={{
              component: ColaboradoresTemplate,
              props: item
            }}
          />
        ))}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
