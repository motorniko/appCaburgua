import { createContext, useContext } from "react";

export const LugaresContext = createContext({
  lugaresActivos: [],
  loading: false,
  refrescarLugares: async () => {},
});

export const useLugares = () => useContext(LugaresContext);