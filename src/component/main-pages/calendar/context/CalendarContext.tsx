import { createContext } from "react";
import { CalendarContextData } from "../types";

export const CalendarContext = createContext<CalendarContextData>({} as CalendarContextData);
export const CalendarContextConsumer = CalendarContext.Consumer;
