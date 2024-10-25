import { createContext } from "react";
import { CommData } from "./ContextTypes";

export const CommContext = createContext<CommData>({} as CommData);
