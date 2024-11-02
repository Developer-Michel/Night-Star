import { createContext } from "react";
import { LayoutContextData } from "./types/ContextType";

export const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData);
export const LayoutContextConsumer = LayoutContext.Consumer;
