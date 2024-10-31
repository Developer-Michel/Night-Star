import { Login } from "@component/main-pages/login/Login";
import { useDataContext } from "../../context/DataContext";
import "./Content.scss";
import { Home } from "@component/main-pages/home/Home";
import { Stats } from "@component/main-pages/stats/Stats";
import { Goal } from "@component/main-pages/goal/Goal";
import { Feedback } from "@component/main-pages/feedback/Feedback";
import { Book } from "@component/main-pages/book/Book";
import { Profile } from "@component/main-pages/profile/Profile";
export const Content = () => {
  const { selectedUser, selectedPage } = useDataContext();
  if (!selectedUser) return <Login />;
  const renderPageContent = () => {
    switch (selectedPage) {
      case "HOME":
        return <Home />;
      case "STATS":
        return <Stats />;
      case "GOAL":
        return <Goal />;
      case "FEEDBACK":
        return <Feedback />;
      case "BOOK":
        return <Book />;
      case "PROFILE":
        return <Profile />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return <div className="main-container">{renderPageContent()}</div>;
};
