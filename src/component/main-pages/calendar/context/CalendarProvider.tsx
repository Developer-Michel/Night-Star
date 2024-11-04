import { ReactNode, useEffect, useState } from "react";
import { viewType } from "../types";
import { useComm } from "@hooks/useComm";
import { ToDoTask } from "types/Types";
import { useUserData } from "@hooks/useUserData";
import { CalendarContext } from "./CalendarContext";

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ToDoTask[]>([]);
  const [view, setView] = useState<viewType>(viewType.day);
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const updateToDoTask = (toDoTask: ToDoTask) => {
    api.toDoTask.update({
      dto: toDoTask,
      Success: () => {
        setData(data.map((item) => (item.Id === toDoTask.Id ? toDoTask : item)));
      }
    });
  };
  const addToDoTask = (toDoTask: ToDoTask) => {
    api.toDoTask.add({
      dto: toDoTask,
      Success: (dto: ToDoTask) => {
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
        view,
        setView
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
