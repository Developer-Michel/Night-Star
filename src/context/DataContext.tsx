import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode, createContext, useContext, useState } from "react";
import { faHouse, faChartLine, faUser, faGear, faTrophy, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { UserDto } from "types/Types";
interface DataContextData {
  selectedUser: UserDto | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDto | undefined>>;
  selectedPage: PageType;
  setSelectedPage: React.Dispatch<React.SetStateAction<PageType>>;
}

export const DataContext = createContext<DataContextData>({} as DataContextData);
export const DataContextConsumer = DataContext.Consumer;
export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<UserDto>();
  const [selectedPage, setSelectedPage] = useState<PageType>(PageType.home);
  return (
    <DataContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedPage,
        setSelectedPage
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
  feedback = "FEEDBACK",
  settings = "SETTINGS"
}
export const PageIconMap: { [key in PageType]: IconDefinition } = {
  [PageType.home]: faHouse,
  [PageType.goal]: faTrophy,
  [PageType.stats]: faChartLine,
  [PageType.profile]: faUser,
  [PageType.feedback]: faCommentDots,
  [PageType.settings]: faGear
};
