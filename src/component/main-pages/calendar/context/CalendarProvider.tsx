import { ReactNode, useEffect, useState } from "react";
import { calendarViewType } from "../types";
import { useComm } from "@hooks/useComm";
import { TaskDto } from "types/Types";
import { useUserData } from "@hooks/useUserData";
import { CalendarContext } from "./CalendarContext";

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<TaskDto[]>([]);
  const [view, setView] = useState<calendarViewType>(calendarViewType.day);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const updateToDoTask = (toDoTask: TaskDto) => {
    api.toDoTask.update({
      dto: toDoTask,
      Success: () => {
        setData(data.map((item) => (item.Id === toDoTask.Id ? toDoTask : item)));
      }
    });
  };
  const addToDoTask = (toDoTask: TaskDto) => {
    api.toDoTask.add({
      dto: toDoTask,
      Success: (dto: TaskDto) => {
        setData([...data, dto]);
      }
    });
  };
  useEffect(() => {
    api.toDoTask.getAll({ dto: { userId: selectedUser.Id }, Success: setData });
  }, []);
  return (
    <CalendarContext.Provider
      value={{
        data,
        updateToDoTask,
        addToDoTask,
        selectedDay,
        setSelectedDay,
        view,
        setView
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
