import { useDataContext } from "@context/DataContext";
import { Button } from "react-bootstrap";
import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
export const Profile = () => {
  const { selectedUser, setSelectedUser } = useDataContext();
  return (
    <div className="profile">
      <img src={`/assets/${selectedUser?.UserName.toString()}.jpg`} alt={selectedUser?.toString()} />
      <div>{selectedUser?.Name}</div>
      <div>BirthDay: {selectedUser?.BirthDate}</div>
      <Button className="disconnect-button" onClick={() => setSelectedUser(null)}>
        DISCONNECT
        <FontAwesomeIcon icon={faDoorOpen} />
      </Button>
    </div>
  );
};
