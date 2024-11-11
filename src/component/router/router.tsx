import { Book } from "@component/main-pages/book/Book";
import { Calendar } from "@component/main-pages/calendar/calendar";
import { Diary } from "@component/main-pages/diary/Diary";
import { Feedback } from "@component/main-pages/feedback/Feedback";
import { Goal } from "@component/main-pages/goal/Goal";
import { Home } from "@component/main-pages/home/Home";
import { NotificationPage } from "@component/main-pages/notification/notification";
import { Post } from "@component/main-pages/post/Post";
import { Profile } from "@component/main-pages/profile/Profile";
import { Recipe } from "@component/main-pages/recipe/Recipe";
import { Stats } from "@component/main-pages/stats/Stats";
import { useLayout } from "@hooks/useLayout";

export const Router = () => {
  const { selectedPage } = useLayout();
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
      case "NOTIFICATION":
        return <NotificationPage />;
      case "DIARY":
        return <Diary />;
      case "CALENDAR":
        return <Calendar />;
      // case "RECIPE":
      //   return <Recipe />;
      case "POST":
        return <Post />;
      default:
        return <h1>Page Not Found</h1>;
    }
  };
  return <>{renderPageContent()}</>;
};
