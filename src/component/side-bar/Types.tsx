import {
  faBell,
  faBook,
  faChartLine,
  faCommentDots,
  faHouse,
  faTrophy,
  faUser,
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
  stats = "STATS",
  goal = "GOAL",
  profile = "PROFILE",
  book = "BOOK",
  feedback = "FEEDBACK",
  notification = "NOTIFICATION"
}
export const PageIconMap: { [key in PageType]: IconDefinition } = {
  [PageType.home]: faHouse,
  [PageType.goal]: faTrophy,
  [PageType.stats]: faChartLine,
  [PageType.profile]: faUser,
  [PageType.feedback]: faCommentDots,
  [PageType.book]: faBook,
  [PageType.notification]: faBell
};
