import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths,
  addDays,
  isSameMonth,
  isSameDay,
  format
} from "date-fns";
import { useState, useEffect } from "react";

import { useCalendar } from "./context/useCalendar";
import { calendarViewType } from "./types";
import DateNavigator from "../home/assets/date-navigator/DateNavigator";
import { getCurrentEasternTimeDate } from "@component/service/format";
export const MonthView = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentEasternTimeDate());
  const { setView, setSelectedDay, data, view } = useCalendar();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 200);
  }, []);
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEEEE"; // Short day names, e.g., Mon, Tue

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day-name" key={i}>
          {format(addDays(startOfWeek(getCurrentEasternTimeDate()), i), dateFormat)}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };
  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let counter = 0;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        counter++;
        formattedDate = format(day, "d");
        const savedday = new Date(day.getTime());
        const delay = counter * 0.05 + "s";
        const found = data.filter((x) => x.Date == format(day, "yyyy-MM-dd"));
        days.push(
          <div
            onClick={() => {
              setSelectedDay(savedday);
              setView(calendarViewType.day);
            }}
            className={`calendar-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""}
                ${isSameDay(day, getCurrentEasternTimeDate()) ? "today" : ""}`}
            key={day.toString()}
            style={{ transitionDelay: delay }}>
            <div className="calendar-cell-header ">{formattedDate}</div>

            <div className="calendar-cell-body">
              {found.map((x) => (
                <div className="square" style={{ backgroundColor: x.Color }}></div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className={`calendar ${visible && "visible"}`}>
      <DateNavigator
        currentDate={currentMonth}
        onPreviousDayPressed={handlePreviousMonth}
        onNextDayPressed={handleNextMonth}
        setView={setView}
        view={view}
        setSelectedDay={setSelectedDay}
      />
      {renderDays()}
      {renderCells()}
      <hr></hr>
      {/* <GradientLegend /> */}
    </div>
  );
};
