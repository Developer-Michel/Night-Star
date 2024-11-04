import loadingIcon from "public/assets/LoadingIcon.png";
import "./LoadingSpinner.scss";
export function LoadingSpinner() {
  return (
    <div style={{ width: "100%", position: "absolute", height: "100%" }}>
      <div className="loading-icon" style={{ top: "50%", position: "absolute", left: "50%" }}>
        <img src={loadingIcon} />
      </div>
    </div>
  );
}
