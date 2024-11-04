import { calendarViewType } from "../calendar/types";

export interface HomeContextData {
  setView: React.Dispatch<React.SetStateAction<calendarViewType>>;
  view: calendarViewType;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}
