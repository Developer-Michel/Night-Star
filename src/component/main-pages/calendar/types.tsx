import { ToDoTask } from "types/Types";

export interface CalendarContextData {
  data: ToDoTask[];
  setView: React.Dispatch<React.SetStateAction<viewType>>;
  view: viewType;
  updateToDoTask: (toDoTask: ToDoTask) => void;
  addToDoTask: (toDoTask: ToDoTask) => void;
}
export enum viewType {
  day = "DAY",
  week = "WEEK",
  month = "MONTH"
}
