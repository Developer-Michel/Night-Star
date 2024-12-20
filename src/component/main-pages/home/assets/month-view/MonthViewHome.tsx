import { faFaceSmile, faMessage, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useComm } from "@hooks/useComm";
import { useUserData } from "@hooks/useUserData";
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
import { TrackingData } from "types/Types";
import { useHomeContext } from "../../context/UseHomeContext";
import DateNavigator from "../date-navigator/DateNavigator";
import { calendarViewType } from "@component/main-pages/calendar/types";
export const MonthViewHome = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { setSelectedDay, setView, view } = useHomeContext();
  const [data, setData] = useState<TrackingData[]>([]);
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    api.tracker.getDatas({
      dto: { userId: selectedUser.Id, startDate: startDate, endDate: endDate },
      Success: setData
    });
  }, [currentMonth]);
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
          {format(addDays(startOfWeek(new Date()), i), dateFormat)}
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
        const found = data.find((x) => x.Date == format(day, "yyyy-MM-dd"));
        days.push(
          <div
            onClick={() => {
              setSelectedDay(savedday);
              setView(calendarViewType.day);
            }}
            className={`calendar-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${!found && "empty"}
                ${isSameDay(day, new Date()) ? "today" : ""}`}
            key={day.toString()}
            style={{ transitionDelay: delay, backgroundColor: found && happinessColors[found.HapinessLevel] }}>
            <span>{formattedDate}</span>

            <span className="calendar-cell-indicator">
              {(found?.HappySentence.length ?? 0) > 0 && <FontAwesomeIcon icon={faFaceSmile} size="xs" />}
              {(found?.RealisationSentence?.length ?? 0) > 0 && <FontAwesomeIcon icon={faMessage} size="xs" />}
              {found?.ImageUrl && <FontAwesomeIcon icon={faPhotoFilm} size="xs" />}
            </span>
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
      <GradientLegend />
    </div>
  );
};
const happinessColors = [
  "#f2f8f2", // 1 - Very light, near-white (very low happiness)
  "#e6f3e6", // 2
  "#d9edd9", // 3
  "#ccf2cc", // 4
  "#bfe6bf", // 5 - Light sage green (neutral)
  "#b3d9b3", // 6
  "#a6cca6", // 7
  "#99bf99", // 8
  "#8cb28c", // 9
  "#80a680" // 10 - Soft sage green (very happy)
];
const GradientLegend = () => {
  return (
    <div className="legend" style={{ padding: "0.5em" }}>
      <h3>Legend</h3>
      <div>Happy level</div>
      <div className="gradient-legend">
        <span className="legend-label">Low </span>
        <div className="legend-gradient-bar"></div>
        <span className="legend-label">High </span>
      </div>
      <div>
        <FontAwesomeIcon icon={faFaceSmile} size="xs" /> : Has Happy sentence
        <br></br>
        <FontAwesomeIcon icon={faMessage} size="xs" /> : Has realization Sentence
        <br></br>
        <FontAwesomeIcon icon={faPhotoFilm} size="xs" /> : Has picture in it
      </div>

      <div>
        <div className="empty-legend"></div> <div style={{ display: "inline-block" }}>: Has no data entered </div>
      </div>
    </div>
  );
};
