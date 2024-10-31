import { Col, Container, Row } from "react-bootstrap";
import "./Login.scss";
import { useEffect, useState } from "react";
import { useDataContext } from "@context/DataContext";
import { UserDto } from "types/Types";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
export const Login = () => {
  const { userList } = useDataContext();

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
        <LoginCell key={x.UserName} user={x} delay={i * 100} />
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
        <button onClick={onClick} className={`login-cell ${isVisible ? " visible" : ""} ${user.UserName}`}>
          <img
            src={`/assets/${user.UserName.toString()}.jpg`}
            alt={user.UserName.toString()}
            className="login-img-col"
          />
          <div className="login-name-cell">
            {user.UserName}
            <br></br>
            <p>{user.Description}</p>
          </div>
        </button>
      </Col>
    </Row>
  );
};
