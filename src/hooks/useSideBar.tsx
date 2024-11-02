import { SideBarControllerContext } from "@context/SidebarControllerContext";
import { useContext } from "react";

export function useSideBar() {
    const context = useContext(SideBarControllerContext);
    if (!context) {
        throw new Error("useSideBar must be used within SideBarControllerProvider");
    }
    return context;
}