import { useComm } from "@hooks/useComm";
import { ReactNode, useState, useEffect } from "react";
import { UserDto } from "types/Types";
import { DataContext } from "./DataContext";

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<UserDto[]>([]);

  const { api } = useComm();
  useEffect(() => {
    api.login.getAllUser({ Success: setUserList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataContext.Provider
      value={{
        userList
      }}>
      {children}
    </DataContext.Provider>
  );
};
