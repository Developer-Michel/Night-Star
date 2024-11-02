import { useComm } from "@hooks/useComm";
import { ReactNode, useState, useEffect } from "react";
import { NotificationDTO } from "types/Types";
import { UserDataContext } from "./UserDataContext";
import { Login } from "@component/main-pages/login/Login";
import { useRecoilState } from "recoil";
import { selectedUserAtom } from "@recoil/atom";

export const UserDataContextProvider = ({ children }: { children: ReactNode }) => {
  const [dataUpdatedToday, setDataUpdatedToday] = useState({ incr: 0, updated: false });
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
  const { api } = useComm();
  const logout = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    if (selectedUser) api.notification.getAll({ dto: { userId: selectedUser.Id }, Success: setNotifications });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  if (selectedUser === null) return <Login setSelectedUser={setSelectedUser} />;
  return (
    <UserDataContext.Provider
      value={{
        dataUpdatedToday,
        setDataUpdatedToday,
        notifications,
        setNotifications,
        logout,
        selectedUser
      }}>
      {children}
    </UserDataContext.Provider>
  );
};
