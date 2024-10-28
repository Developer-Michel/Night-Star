import { Navbar, Container } from "react-bootstrap";
import "./Header.scss";
import lotusImage from "/assets/lotus.png";
import { useDataContext } from "@context/DataContext";
import { useEffect } from "react";

export const Header = () => {
  return (
    <Navbar expand="lg" className={`header`}>
      <Container fluid>
        <Navbar.Brand href="#home">
          <img className="header-logo" src={lotusImage} />
        </Navbar.Brand>
        <UserPicture />
      </Container>
    </Navbar>
  );
};
const UserPicture = () => {
  const { selectedUser } = useDataContext();
  useEffect(() => {});
  return (
    <div className={`header-user-img ms-auto ${selectedUser ? "visible" : ""}`}>
      <Navbar.Brand href="#profile">
        {selectedUser && <img src={`/assets/${selectedUser.UserName.toString()}.jpg`} alt={selectedUser.toString()} />}
      </Navbar.Brand>
    </div>
  );
};
