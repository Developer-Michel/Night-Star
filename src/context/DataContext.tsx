import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { faHouse, faChartLine, faUser, faTrophy, faCommentDots, faBook } from "@fortawesome/free-solid-svg-icons";
import { UserDto } from "types/Types";
import { useComm } from "@hooks/useComm";
interface DataContextData {
  selectedUser: UserDto | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
  selectedPage: PageType;
  setSelectedPage: React.Dispatch<React.SetStateAction<PageType>>;
  userList: UserDto[];
  dataUpdatedToday: { incr: number; updated: boolean };
  setDataUpdatedToday: React.Dispatch<React.SetStateAction<{ incr: number; updated: boolean }>>;
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
  const { api } = useComm();
  useEffect(() => {
    api.login.getAllUser({ Success: setUserList });
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
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
        setDataUpdatedToday
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
  feedback = "FEEDBACK"
}
export const PageIconMap: { [key in PageType]: IconDefinition } = {
  [PageType.home]: faHouse,
  [PageType.goal]: faTrophy,
  [PageType.stats]: faChartLine,
  [PageType.profile]: faUser,
  [PageType.feedback]: faCommentDots,
  [PageType.book]: faBook
};
