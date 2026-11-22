import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';
import { Inicio } from './Componentes/Inicio/Inicio';
import { Directorio } from './Componentes/Inicio/Directorio';
import { RecordatorioBarra } from './Componentes/Inicio/RecordatorioBarra';
import { Clima } from './Componentes/Inicio/Clima';
import { useLugares } from './Componentes/Inicio/LugaresContext';

export function AppPrincipal() {
  const { refrescarLugares } = useLugares();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const ultimoFocus = useRef(0);

  useFocusEffect(
    useCallback(() => {
      if (Date.now() - ultimoFocus.current > 15000) {
        ultimoFocus.current = Date.now();
        refrescarLugares();
      }
    }, [refrescarLugares])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    await refrescarLugares();
    ultimoFocus.current = Date.now();
    setRefreshing(false);
  }, [refrescarLugares]);

  return (
    <ImageBackground
      source={require('./assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView intensity={0} tint="dark" style={StyleSheet.absoluteFill} />
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <Inicio />
        <Clima />
        <Directorio />
        <RecordatorioBarra refreshKey={refreshKey} />
      </ScrollView>
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
    paddingVertical: 20,
  },
});