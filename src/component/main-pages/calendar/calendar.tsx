import { CalendarContextProvider } from "./context/CalendarProvider";

import "./calendar.scss";

import { DailyView } from "./DayView";
import { MonthView } from "./MonthView";
import { calendarViewType } from "./types";
import { CalendarContextConsumer } from "./context/CalendarContext";
export const Calendar = () => {
  return (
    <CalendarContextProvider>
      <CalendarContextConsumer>
        {(data) => {
          switch (data.view) {
            case calendarViewType.day:
              return <DailyView />;
            case calendarViewType.month:
              return <MonthView />;
          }
        }}
      </CalendarContextConsumer>
    </CalendarContextProvider>
  );
};
