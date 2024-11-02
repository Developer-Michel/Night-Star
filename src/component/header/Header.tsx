import { Navbar, Container, NavbarBrand } from "react-bootstrap";
import "./Header.scss";
import lotusImage from "/assets/lotus.png";
import { PageType, useDataContext } from "@context/DataContext";
import { useEffect, useState } from "react";
import { useComm } from "@hooks/useComm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const { selectedUser } = useDataContext();
  return (
    <Navbar expand="lg" className={`header`}>
      <Container fluid>
        {selectedUser && (
          <img className="header-background" src={`/assets/${selectedUser.UserName.toString()}_FLOWER.png`} />
        )}
        <Navbar.Brand href="#home">
          <img className="header-logo" src={lotusImage} />
        </Navbar.Brand>

        <UserPicture />
      </Container>
    </Navbar>
  );
};

const UserPicture = () => {
  const { selectedUser, dataUpdatedToday, setSelectedPage, notifications } = useDataContext();
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
