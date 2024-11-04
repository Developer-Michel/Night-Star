import "./Home.scss";
import { DailyView } from "./assets/day-view/DayView";
import { HomeContextProvider } from "./context/HomeProvider";
import { HomeContextConsumer } from "./context/HomeContext";
import { homeViewType } from "./Types";
import { MonthView } from "./assets/month-view/MonthView";

export const Home = () => {
  return (
    <HomeContextProvider>
      <HomeContextConsumer>
        {(data) => {
          switch (data.view) {
            case homeViewType.day:
              return <DailyView />;
            case homeViewType.month:
              return <MonthView />;
          }
        }}
      </HomeContextConsumer>
    </HomeContextProvider>
  );
};
