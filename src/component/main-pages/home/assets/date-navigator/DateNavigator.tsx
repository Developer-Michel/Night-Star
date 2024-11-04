import { format, isToday } from "date-fns";
import "./DateNavigator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { homeViewType } from "../../Types";
import { useHomeContext } from "../../context/UseHomeContext";
const DateNavigator = ({
  currentDate,
  onNextDayPressed,
  onPreviousDayPressed
}: {
  currentDate: Date;
  onNextDayPressed: () => void;
  onPreviousDayPressed: () => void;
}) => {
  const { setView, view, setSelectedDay } = useHomeContext();

  return (
    <div className={`date-navigator`}>
      {/* Previous Date Button */}
      <button onClick={onPreviousDayPressed}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      {/* Next Date Button (disabled if the current date is today) */}
      <button onClick={onNextDayPressed} disabled={isToday(currentDate)}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>

      {/* Display the current date */}
      <span className="date-navigator-indicator">
        <FontAwesomeIcon icon={faCalendar} />
        &nbsp;
        {format(currentDate, "yyyy-MM-dd")}
      </span>
      {view === homeViewType.day && <button onClick={() => setView(homeViewType.month)}>MONTH</button>}
      {view === homeViewType.month && (
        <button
          onClick={() => {
            setSelectedDay(new Date());
            setView(homeViewType.day);
          }}>
          TODAY
        </button>
      )}
    </div>
  );
};

export default DateNavigator;
