import { createContext, useContext } from "react";

export const LugaresContext = createContext([]);
export const useLugares = () => useContext(LugaresContext);