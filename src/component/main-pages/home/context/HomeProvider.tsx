import { ReactNode, useState } from "react";
import { homeViewType } from "@component/main-pages/home/Types";
import { HomeContext } from "@component/main-pages/home/context/HomeContext";

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<homeViewType>(homeViewType.day);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  return (
    <HomeContext.Provider
      value={{
        view,
        setView,
        selectedDay,
        setSelectedDay
      }}>
      {children}
    </HomeContext.Provider>
  );
};
