import { createContext } from "react";

import { UserDataContextData } from "./types/ContextType";

export const UserDataContext = createContext<UserDataContextData>({} as UserDataContextData);
export const UserDataContextConsumer = UserDataContext.Consumer;
