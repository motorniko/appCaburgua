/* import { createContext, useContext } from "react";

export const LugaresContext = createContext({
  lugaresActivos: [],
  loading: false,
  refrescarLugares: async () => {},
});

export const useLugares = () => useContext(LugaresContext);


 */




import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchJson } from "./api";

const CACHE_KEY = "lugares_cache_v1";
const INTERVALO_MIN_MS = 15000;

const normalizarLugares = (data) =>
  Array.isArray(data)
    ? data.filter(
        (lugar) => lugar && typeof lugar === "object" && !Array.isArray(lugar)
      )
    : [];

export const LugaresContext = createContext({
  lugaresActivos: [],
  cargado: false,
  error: false,
  refrescarLugares: async () => {},
});

export const useLugares = () => useContext(LugaresContext);

export function LugaresProvider({ children }) {
  const [lugaresData, setLugaresData] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [error, setError] = useState(false);

  const appState = useRef(AppState.currentState);
  const ultimaCarga = useRef(0);
  const cargaEnCurso = useRef(null);
  const refrescoForzadoPendiente = useRef(false);
  const mounted = useRef(true);

  // Estable: no cambia entre renders. El throttle vive aquí, así las
  // pantallas solo llaman refrescarLugares() y no repiten la lógica.
  const refrescarLugares = useCallback(async ({ forzar = false } = {}) => {
    if (cargaEnCurso.current) {
      if (forzar) refrescoForzadoPendiente.current = true;
      return cargaEnCurso.current;
    }
    if (!forzar && Date.now() - ultimaCarga.current < INTERVALO_MIN_MS) return;

    let carga;
    carga = (async () => {
      try {
        let repetir;
        do {
          refrescoForzadoPendiente.current = false;
          try {
            const data = await fetchJson("/categorias/export");
            const lista = normalizarLugares(data);
            ultimaCarga.current = Date.now();
            if (mounted.current) {
              setLugaresData(lista);
              setError(false);
              AsyncStorage.setItem(CACHE_KEY, JSON.stringify(lista)).catch(() => {});
            }
          } catch (e) {
            console.error("Error cargando lugares:", e);
            if (mounted.current) setError(true);
          } finally {
            if (mounted.current) setCargado(true);
          }
          repetir = refrescoForzadoPendiente.current && mounted.current;
        } while (repetir);
      } finally {
        if (cargaEnCurso.current === carga) cargaEnCurso.current = null;
      }
    })();
    cargaEnCurso.current = carga;
    return carga;
  }, []);

  useEffect(() => {
    mounted.current = true;

    (async () => {
      // 1) Mostrar lo último guardado (funciona sin señal)
      try {
        const cache = await AsyncStorage.getItem(CACHE_KEY);
        if (cache && mounted.current) {
          const lista = normalizarLugares(JSON.parse(cache));
          setLugaresData(lista);
          setCargado(true);
        }
      } catch {}
      // 2) Actualizar desde la red
      refrescarLugares({ forzar: true });
    })();

    const subscription = AppState.addEventListener("change", (next) => {
      const volvioActiva =
        /inactive|background/.test(appState.current) && next === "active";
      appState.current = next;
      if (volvioActiva) refrescarLugares();
    });

    return () => {
      mounted.current = false;
      subscription.remove();
    };
  }, [refrescarLugares]);

  const lugaresActivos = useMemo(
    () => lugaresData.filter((lugar) => lugar.enable),
    [lugaresData]
  );

  const value = useMemo(
    () => ({ lugaresActivos, cargado, error, refrescarLugares }),
    [lugaresActivos, cargado, error, refrescarLugares]
  );

  return (
    <LugaresContext.Provider value={value}>{children}</LugaresContext.Provider>
  );
}