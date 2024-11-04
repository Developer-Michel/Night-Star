import { ReactNode, useState } from "react";

import { HomeContext } from "@component/main-pages/home/context/HomeContext";
import { calendarViewType } from "@component/main-pages/calendar/types";

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<calendarViewType>(calendarViewType.day);
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
