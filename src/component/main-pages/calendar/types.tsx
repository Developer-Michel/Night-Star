import { TaskDto } from "types/Types";

export interface CalendarContextData {
  data: TaskDto[];
  setView: React.Dispatch<React.SetStateAction<calendarViewType>>;
  view: calendarViewType;
  updateToDoTask: (toDoTask: TaskDto) => void;
  addToDoTask: (toDoTask: TaskDto) => void;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}
export enum calendarViewType {
  day = "DAY",
  week = "WEEK",
  month = "MONTH"
}
