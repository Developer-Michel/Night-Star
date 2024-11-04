import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  return context;
};
