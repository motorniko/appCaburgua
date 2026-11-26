
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Inicio } from './Componentes/Inicio/Inicio';
import { Directorio } from './Componentes/Inicio/Directorio';
import { RecordatorioBarra } from './Componentes/Inicio/RecordatorioBarra';
import { Clima } from './Componentes/Inicio/Clima';
import { useLugares } from './Componentes/Inicio/LugaresContext';
import { ScrimBarraEstado } from './Componentes/Inicio/ScrimBarraEstado';
import { Propietario } from './Componentes/Inicio/propietario';

export function AppPrincipal() {
  const insets = useSafeAreaInsets();
  const { refrescarLugares } = useLugares();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // El throttle está dentro del provider
  useFocusEffect(
    useCallback(() => {
      refrescarLugares();
    }, [refrescarLugares])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1); // refresca Clima y Recordatorios
    try {
      await refrescarLugares({ forzar: true });
    } finally {
      setRefreshing(false);
    }
  }, [refrescarLugares]);

  return (
    <ImageBackground
      source={require('./assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: Math.max(insets.top + 8, 20),
            paddingBottom: Math.max(insets.bottom + 12, 20),
          },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <View style={styles.contenido}>
          <Inicio />
          <Clima refreshKey={refreshKey} />
          <Directorio />
          <RecordatorioBarra refreshKey={refreshKey} />
          <Propietario />
        </View>
      </ScrollView>
      <ScrimBarraEstado />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
  },
  // En tablets el contenido no se estira: ancho máximo y centrado
  contenido: {
    width: '100%',
    maxWidth: 560,
    alignItems: 'center',
  },
});