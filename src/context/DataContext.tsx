import { createContext } from "react";
import { DataContextData } from "./types/ContextType";

export const DataContext = createContext<DataContextData>({} as DataContextData);
export const DataContextConsumer = DataContext.Consumer;
