import { createContext } from "react";
import { SideBarControllers } from "./types/ContextType";

export const SideBarControllerContext = createContext<SideBarControllers>({} as SideBarControllers);
