import { TaskDto } from "types/Types";

export interface CalendarContextData {
  data: TaskDto[];
  setView: React.Dispatch<React.SetStateAction<calendarViewType>>;
  view: calendarViewType;
  updateToDoTask: (toDoTask: TaskDto) => void;
  addToDoTask: (toDoTask: TaskDto) => void;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  deleteToDoTask: (toDoTask: TaskDto) => void;
  completeToDoTask: (toDoTask: TaskDto) => void;
}
export enum calendarViewType {
  day = "DAY",
  week = "WEEK",
  month = "MONTH"
}
export enum taskStatusType {
  pending = "pending",
  completed = "completed",
  overdue = "overdue"
}
export enum taskOccurenceType {
  everyXDay = "EveryXDay",
  daysOfWeek = "DaysOfWeek",
  daily = "Daily",
  onetime = "OneTime"
}
