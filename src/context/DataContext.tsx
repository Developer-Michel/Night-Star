import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { faHouse, faChartLine, faUser, faTrophy, faCommentDots, faBook } from "@fortawesome/free-solid-svg-icons";
import { UserDto } from "types/Types";
import { useComm } from "@hooks/useComm";
interface DataContextData {
  selectedUser: UserDto | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDto | undefined>>;
  selectedPage: PageType;
  setSelectedPage: React.Dispatch<React.SetStateAction<PageType>>;
  userList: UserDto[];
}

export const DataContext = createContext<DataContextData>({} as DataContextData);
export const DataContextConsumer = DataContext.Consumer;
export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto>();
  const [selectedPage, setSelectedPage] = useState<PageType>(PageType.home);
  const { api } = useComm();
  useEffect(() => {
    api.login.getAllUser({ Success: setUserList });
  }, []);
  return (
    <DataContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedPage,
        setSelectedPage,
        userList
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
