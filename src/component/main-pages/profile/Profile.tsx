import { Button } from "react-bootstrap";
import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "@hooks/useUserData";
export const Profile = () => {
  const { selectedUser, logout } = useUserData();
  return (
    <div className="profile">
      <img src={`/assets/${selectedUser?.UserName.toString()}.jpg`} alt={selectedUser?.toString()} />
      <div>{selectedUser?.Name}</div>
      <div>BirthDay: {selectedUser?.BirthDate}</div>
      <Button className="disconnect-button" onClick={() => logout()}>
        DISCONNECT
        <FontAwesomeIcon icon={faDoorOpen} />
      </Button>
    </div>
  );
};
