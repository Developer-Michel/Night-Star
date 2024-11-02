import { faArrowLeft, faBars, faLineChart } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, ReactNode } from "react";
import { SideBarControllerContext } from "./SidebarControllerContext";
import Sidebar from "@component/side-bar/Sidebar";
import { PageIconMap, PageType, SideBarNavElement } from "@component/side-bar/Types";
import { useLayout } from "@hooks/useLayout";

export const SideBarControllerProvider = (props: { children: ReactNode }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const sideBarNav = useRef<SideBarNavElement[] | null>(null);
  const [sidebarIcon, setSidebarIcon] = useState(faBars);
  const { setSelectedPage, selectedPage } = useLayout();
  //   const { showTransition, hideInDelayTransition } = useTransitionController();
  const changeIcon = (icon: PageType) => {
    setSelectedPage(icon);
    setShowSideBar(false);
  };
  useEffect(() => {
    if (showSideBar) setSidebarIcon(faArrowLeft);
    else setSidebarIcon(PageIconMap[selectedPage]);
  }, [showSideBar, selectedPage]);

  return (
    <SideBarControllerContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
        changeIcon,
        sideBarNav,
        sidebarIcon,
        setSidebarIcon
      }}>
      <Sidebar />
      {props.children}
    </SideBarControllerContext.Provider>
  );
};
