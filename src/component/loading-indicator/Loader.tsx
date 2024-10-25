import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CentralLoader = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="center">
        <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
      </div>
    </div>
  );
};
