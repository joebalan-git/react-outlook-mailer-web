import { useContext, createContext } from "react";

export const AppContext = createContext({} as any);

export function useAppContext() {
  return useContext(AppContext);
}