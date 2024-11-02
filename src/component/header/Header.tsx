import { Navbar, Container, NavbarBrand } from "react-bootstrap";
import "./Header.scss";
import { useEffect, useState } from "react";
import { useComm } from "@hooks/useComm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "@hooks/useUserData";
import { useLayout } from "@hooks/useLayout";
import { PageType } from "@component/side-bar/Types";
import { useSideBar } from "@hooks/useSideBar";

export const Header = () => {
  const { selectedUser } = useUserData();
  const { showSideBar, setShowSideBar, sidebarIcon } = useSideBar();
  return (
    <Navbar expand="lg" className={`header ${showSideBar ? "sidebar-toggled" : ""}`}>
      <Container fluid>
        {selectedUser && (
          <img className="header-background" src={`/assets/${selectedUser.UserName.toString()}_FLOWER.png`} />
        )}
        {/* <Navbar.Brand href="#home">
          <img className="header-logo" src={lotusImage} />
        </Navbar.Brand> */}
        <Navbar.Brand>
          <span
            className="open-close-button "
            aria-hidden="true"
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}>
            <FontAwesomeIcon icon={sidebarIcon} />
          </span>
        </Navbar.Brand>
        <UserPicture />
      </Container>
    </Navbar>
  );
};

const UserPicture = () => {
  const { dataUpdatedToday, notifications, selectedUser } = useUserData();
  const { setSelectedPage } = useLayout();
  const [streakCount, setStreakCount] = useState(1);
  const unseenQuantity = notifications.filter((x) => !x.Seen).length;
  const { api } = useComm();
  const count = dataUpdatedToday.updated ? streakCount : streakCount;
  useEffect(() => {
    if (selectedUser) api.tracker.getStreakCount({ dto: { userId: selectedUser.Id }, Success: setStreakCount });
  }, [selectedUser, dataUpdatedToday]);
  return (
    <div className={`header-user-img ms-auto ${selectedUser ? "visible" : ""}`}>
      <NavbarBrand>
        {selectedUser && (
          <>
            <img
              onClick={() => setSelectedPage(PageType.profile)}
              src={`/assets/${selectedUser.UserName.toString()}.jpg`}
              alt={selectedUser.toString()}
            />

            <div className={`streak-img ms-auto ${selectedUser ? "visible" : ""}`}>
              <img src={`/assets/Fire${dataUpdatedToday.updated ? "" : "Weak"}.png`} />
              <div className="streak-count">{count}</div>
            </div>
            <div className="notif" onClick={() => setSelectedPage(PageType.notification)}>
              <FontAwesomeIcon size="lg" className={`notif-icon ${unseenQuantity > 0 && "blink"}`} icon={faBell} />
              {unseenQuantity > 0 && <div className="notif-counter">{unseenQuantity}</div>}
            </div>
          </>
        )}
      </NavbarBrand>
    </div>
  );
};
