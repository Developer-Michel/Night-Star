import "./Sidebar.scss";
import { useSideBar } from "@hooks/useSideBar";
import { SidebarLeftPart } from "./SidebarLeftPart";
import { useRef, useEffect } from "react";
// import { SidebarRightPart } from "./SidebarRightPart";

export default function Sidebar() {
  const { showSideBar, setShowSideBar } = useSideBar();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Close the sidebar when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is outside the sidebar and not on the button
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        !target.classList.contains("open-close-button")
      ) {
        setShowSideBar(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sidebarRef} className={"side-bar" + (showSideBar ? " sidebar-toggled" : "")}>
      <SidebarLeftPart />
      {/* <SidebarRightPart /> */}
    </div>
  );
}
