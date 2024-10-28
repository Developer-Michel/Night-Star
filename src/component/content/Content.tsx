import { Login } from "@component/login/Login";
import { useDataContext } from "../../context/DataContext";
import "./Content.scss";
import { Home } from "@component/main-pages/home/Home";
import { Stats } from "@component/main-pages/stats/Stats";
import { Goal } from "@component/goal/Goal";
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
        return <h1>Feedback</h1>;
      case "SETTINGS":
        return <h1>Settings Page</h1>;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return <div className="main-container">{renderPageContent()}</div>;
};
