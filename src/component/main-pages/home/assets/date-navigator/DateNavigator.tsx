import React, { useEffect, useState } from "react";
import { format, addDays, subDays, isToday } from "date-fns";
import "./DateNavigator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
const DateNavigator = ({
  currentDate,
  setCurrentDate
}: {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  // Initialize the date state with today's date

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  // Function to handle the previous date
  const handlePreviousDate = () => {
    setCurrentDate((prevDate) => subDays(prevDate, 1));
  };

  // Function to handle the next date
  const handleNextDate = () => {
    setCurrentDate((prevDate) => {
      const nextDate = addDays(prevDate, 1);
      return isToday(nextDate) ? new Date() : nextDate; // Ensure we don't go past today
    });
  };

  return (
    <div
      className={`date-navigator ${isVisible ? "visible" : ""}`}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
      {/* Previous Date Button */}
      <button onClick={handlePreviousDate}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>

      {/* Display the current date */}
      <span className="date-navigator-indicator">
        <FontAwesomeIcon icon={faCalendar} />
        &nbsp;
        {format(currentDate, "yyyy-MM-dd")}
      </span>

      {/* Next Date Button (disabled if the current date is today) */}
      <button onClick={handleNextDate} disabled={isToday(currentDate)}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};

export default DateNavigator;
