// import DragScrollContainer from "@components/drag-scroll-container/DragScrollContainer";
// import { ProjectRootContext } from "@context/ProjectRootContext";
// import { UserControllerContext } from "@context/UserControllerContext";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useSideBar } from "@hooks/useSideBar";
// import { useContext } from "react";

// export function SidebarRightPart() {
//     const { user } = useContext(UserControllerContext);
//     const { sideBarContent } = useSideBar();
//     const { api } = useContext(ProjectRootContext);
//     return (<div className="sidebar-right">

//         <div className="sidebar-top">

//             <div style={{ width: "100%" }}>
//                 <div style={{ marginLeft: "0.5em" }} > <FontAwesomeIcon icon={faUser} size="2xl" className="" /></div>
//                 <div style={{ lineHeight: "1" }}>
//                     <div style={{ fontSize: "0.8em" }}>{user.UserName}</div>
//                     <br />
//                     <div style={{ fontSize: "0.8em" }}>EBSU {user.Role.NormalizedName}</div>

//                 </div>

//             </div>
//         </div>
//         <DragScrollContainer className="sidebar-nav reduced-scroller" style={{ overflowX: "hidden" }} >
//             {sideBarContent}
//         </DragScrollContainer>

//         <div className="sidebar-footer">
//             <div>App Version - V {import.meta.env.VITE_VERSION}  {api?.name} {import.meta.env.NODE_ENV} </div>
//         </div>

//     </div>);
// }
