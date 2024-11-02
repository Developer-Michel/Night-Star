import { LayoutContext } from "@context/LayoutContext";
import { useContext } from "react";

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return context;
};
