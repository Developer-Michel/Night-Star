import { createContext } from "react";
import { HomeContextData } from "../Types";

export const HomeContext = createContext<HomeContextData>({} as HomeContextData);
export const HomeContextConsumer = HomeContext.Consumer;
