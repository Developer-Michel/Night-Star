import { Navbar, Container, NavbarBrand } from "react-bootstrap";
import "./Header.scss";
import lotusImage from "/assets/lotus.png";
import { useDataContext } from "@context/DataContext";
import { useEffect, useState } from "react";
import { useComm } from "@hooks/useComm";

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
  const { selectedUser, dataUpdatedToday } = useDataContext();
  const [streakCount, setStreakCount] = useState(0);
  const { api } = useComm();

  useEffect(() => {
    if (selectedUser) api.tracker.getStreakCount({ dto: { userId: selectedUser.Id }, Success: setStreakCount });
  }, [selectedUser, dataUpdatedToday]);
  return (
    <div className={`header-user-img ms-auto ${selectedUser ? "visible" : ""}`}>
      <NavbarBrand>
        {selectedUser && (
          <>
            <img src={`/assets/${selectedUser.UserName.toString()}.jpg`} alt={selectedUser.toString()} />

            <div className={`streak-img ms-auto ${selectedUser ? "visible" : ""}`}>
              <img src={`/assets/Fire.png`} />
              <div className="streak-count">{streakCount}</div>
            </div>
          </>
        )}
      </NavbarBrand>
    </div>
  );
};
