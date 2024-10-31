import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LoadingSpinner() {
  return (
    <div style={{ width: "100%", position: "absolute", height: "100%" }}>
      <div style={{ top: "50%", position: "absolute", left: "50%" }}>
        <FontAwesomeIcon icon={faCircleNotch} spin />
      </div>
    </div>
  );
}
