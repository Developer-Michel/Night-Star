import { format, isToday } from "date-fns";
import "./DateNavigator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { calendarViewType } from "@component/main-pages/calendar/types";
import { getCurrentEasternTimeDate } from "@component/service/format";
const DateNavigator = ({
  currentDate,
  onNextDayPressed,
  onPreviousDayPressed,
  setView,
  view,
  setSelectedDay,
  allowFutur = false
}: {
  currentDate: Date;
  onNextDayPressed: () => void;
  onPreviousDayPressed: () => void;
  setView: React.Dispatch<React.SetStateAction<calendarViewType>>;
  view: calendarViewType;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  allowFutur?: boolean;
}) => {
  return (
    <div className={`date-navigator`}>
      {/* Previous Date Button */}
      <button onClick={onPreviousDayPressed}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      {/* Next Date Button (disabled if the current date is today) */}
      <button onClick={onNextDayPressed} disabled={!allowFutur && isToday(currentDate)}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>

      {/* Display the current date */}
      <span className="date-navigator-indicator">
        <FontAwesomeIcon icon={faCalendar} />
        &nbsp;
        {format(currentDate, "yyyy-MM-dd")}
      </span>
      {view === calendarViewType.day && <button onClick={() => setView(calendarViewType.month)}>MONTH</button>}
      {view === calendarViewType.month && (
        <button
          onClick={() => {
            setSelectedDay(getCurrentEasternTimeDate());
            setView(calendarViewType.day);
          }}>
          TODAY
        </button>
      )}
    </div>
  );
};

export default DateNavigator;
