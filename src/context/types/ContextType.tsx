import { PageType, SideBarNavElement } from "@component/side-bar/Types";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MutableRefObject } from "react";
import { UserDto, NotificationDTO } from "types/Types";

export interface SideBarControllers {
  showSideBar: boolean;
  setShowSideBar: (val: boolean) => void;
  sideBarNav: MutableRefObject<SideBarNavElement[] | null>;
  sidebarIcon: IconDefinition;
  setSidebarIcon: (icon: IconDefinition) => void;
  changeIcon: (icon: PageType) => void;
}
export interface DataContextData {
  userList: UserDto[];
}
export interface UserControllerContextData {
  selectedUser: UserDto;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDto | null>>;
}
export interface UserDataContextData {
  selectedUser: UserDto;
  logout: () => void;
  dataUpdatedToday: { incr: number; updated: boolean };
  setDataUpdatedToday: React.Dispatch<React.SetStateAction<{ incr: number; updated: boolean }>>;
  notifications: NotificationDTO[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationDTO[]>>;
}
export interface LayoutContextData {
  selectedPage: PageType;
  setSelectedPage: React.Dispatch<React.SetStateAction<PageType>>;
}
