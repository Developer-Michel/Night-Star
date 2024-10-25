import { Col, Container, Row } from "react-bootstrap";
import "./Login.scss";
import { useEffect, useState } from "react";
import { useDataContext } from "@context/DataContext";
import { UserDto } from "types/Types";
import { useComm } from "@hooks/useComm";
import { LoadingSpinner } from "@component/loading-indicator/LoadingSpinner";
export const Login = () => {
  const [userList, setUserList] = useState<UserDto[]>();
  const { api } = useComm();
  useEffect(() => {
    api.login.getAllUser({ Success: setUserList });
  }, []);
  if (userList == null) return <LoadingSpinner />;
  return (
    <Container className={`login`}>
      <Row>
        <Col>
          <h2>
            <br></br>
          </h2>
        </Col>
      </Row>
      {userList.map((x, i) => (
        <LoginCell user={x} delay={i * 100} />
      ))}
    </Container>
  );
};
const LoginCell = ({ user, delay }: { user: UserDto; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setSelectedUser } = useDataContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);
  const onClick = () => {
    setSelectedUser(user);
  };
  return (
    <Row>
      <Col>
        <button onClick={onClick} className={`login-cell ${isVisible ? " visible" : ""}`}>
          <img src={`/assets/${user.UserName.toString()}.jpg`} alt={user.toString()} className="login-img-col" />
          <div className="login-name-cell">
            {user.UserName}
            <br></br>
            <p>{user.Descrition}</p>
          </div>
        </button>
      </Col>
    </Row>
  );
};
