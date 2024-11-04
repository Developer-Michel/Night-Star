import { useContext } from "react";
import { HomeContext } from "./HomeContext";

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  return context;
};
