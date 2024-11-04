import "./Home.scss";
import { DailyView } from "./assets/day-view/DayViewHome";
import { HomeContextProvider } from "./context/HomeProvider";
import { HomeContextConsumer } from "./context/HomeContext";
import { MonthViewHome } from "./assets/month-view/MonthViewHome";
import { calendarViewType } from "../calendar/types";

export const Home = () => {
  return (
    <HomeContextProvider>
      <HomeContextConsumer>
        {(data) => {
          switch (data.view) {
            case calendarViewType.day:
              return <DailyView />;
            case calendarViewType.month:
              return <MonthViewHome />;
          }
        }}
      </HomeContextConsumer>
    </HomeContextProvider>
  );
};
