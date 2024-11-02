import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
  faHouse,
  faChartLine,
  faUser,
  faTrophy,
  faCommentDots,
  faBook,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { NotificationDTO, UserDto } from "types/Types";
import { useComm } from "@hooks/useComm";
interface DataContextData {
  selectedUser: UserDto | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
  selectedPage: PageType;
  setSelectedPage: React.Dispatch<React.SetStateAction<PageType>>;
  userList: UserDto[];
  dataUpdatedToday: { incr: number; updated: boolean };
  setDataUpdatedToday: React.Dispatch<React.SetStateAction<{ incr: number; updated: boolean }>>;
  notifications: NotificationDTO[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationDTO[]>>;
}

export const DataContext = createContext<DataContextData>({} as DataContextData);
export const DataContextConsumer = DataContext.Consumer;
export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(
    JSON.parse(localStorage.getItem("selectedUser") ?? "null")
  );
  const [selectedPage, setSelectedPage] = useState<PageType>(PageType.home);
  const [dataUpdatedToday, setDataUpdatedToday] = useState({ incr: 0, updated: false });
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const { api } = useComm();

  useEffect(() => {
    api.login.getAllUser({ Success: setUserList });
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    setDataUpdatedToday({ incr: dataUpdatedToday.incr + 1, updated: false });
    if (selectedUser) api.notification.getAll({ dto: { userId: selectedUser.Id }, Success: setNotifications });
  }, [selectedUser]);
  return (
    <DataContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedPage,
        setSelectedPage,
        userList,
        dataUpdatedToday,
        setDataUpdatedToday,
        notifications,
        setNotifications
      }}>
      {children}
    </DataContext.Provider>
  );
};
export const useDataContext = () => {
  const context = useContext(DataContext);
  return context;
};

export enum PageType {
  home = "HOME",
  stats = "STATS",
  goal = "GOAL",
  profile = "PROFILE",
  book = "BOOK",
  feedback = "FEEDBACK",
  notification = "NOTIFICATION"
}
export const PageIconMap: { [key in PageType]: IconDefinition } = {
  [PageType.home]: faHouse,
  [PageType.goal]: faTrophy,
  [PageType.stats]: faChartLine,
  [PageType.profile]: faUser,
  [PageType.feedback]: faCommentDots,
  [PageType.book]: faBook,
  [PageType.notification]: faBell
};
