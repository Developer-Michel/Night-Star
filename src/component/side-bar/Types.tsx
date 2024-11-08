import {
  faBell,
  faBook,
  faBookOpen,
  faCalendarCheck,
  faChartLine,
  faCommentDots,
  faTrophy,
  faUser,
  faYinYang,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export interface SideBarIconInfo {
  onClick: () => void;
  icon: IconDefinition;
  name: string;
}

export interface SideBarNavElement {
  selected: boolean;
  onClick: () => void;
  icon: IconDefinition;
  value: string;
}
export enum PageType {
  home = "HOME",
  // post = "POST",
  diary = "DIARY",
  calendar = "CALENDAR",
  goal = "GOAL",
  book = "BOOK",
  feedback = "FEEDBACK",
  stats = "STATS",
  profile = "PROFILE",

  notification = "NOTIFICATION"
}

export const PageIconMap: { [key in PageType]: IconDefinition } = {
  [PageType.home]: faYinYang,
  [PageType.feedback]: faCommentDots,
  [PageType.calendar]: faCalendarCheck,
  [PageType.goal]: faTrophy,
  [PageType.book]: faBook,
  [PageType.stats]: faChartLine,
  [PageType.profile]: faUser,
  [PageType.diary]: faBookOpen,
  [PageType.notification]: faBell
  // [PageType.post]: faWindowMaximize
};
