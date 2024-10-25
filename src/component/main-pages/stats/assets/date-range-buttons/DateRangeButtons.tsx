import React, { useEffect, useState } from "react";
import { format, subMonths, subYears, subDays } from "date-fns"; // date-fns for date manipulation
import "./DateRangeButtons.scss";
const DateRangeButtons = ({
  setDateRange
}: {
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}) => {
  const today = new Date();
  const [selected, setSelected] = useState<string>();
  const handleWeekRange = () => {
    const endDate = today;
    const startDate = subDays(today, 7); // Add 7 days for the end of the week
    setDateRange({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    });
    setSelected("week");
  };
  useEffect(() => {
    handleWeekRange();
  }, []);
  const handleMonthRange = () => {
    const endDate = today;
    const startDate = subMonths(today, 1); // Add 1 month for the end of the month
    setDateRange({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    });
    setSelected("month");
  };

  const handleYearRange = () => {
    const endDate = today;
    const startDate = subYears(today, 1); // Add 1 year for the end of the year
    setDateRange({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    });
    setSelected("year");
  };

  return (
    <div className="container">
      <button disabled={selected === "week"} onClick={handleWeekRange} className="zen-button">
        Week
      </button>
      <button disabled={selected === "month"} onClick={handleMonthRange} className="zen-button">
        Month
      </button>
      <button disabled={selected === "year"} onClick={handleYearRange} className="zen-button">
        Year
      </button>
    </div>
  );
};

// Basic button styles

export default DateRangeButtons;
