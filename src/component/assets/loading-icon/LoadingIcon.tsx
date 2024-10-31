import "./LoadingIcon.scss";
import loadingIcon from "public/assets/LoadingIcon.png";
const SpinningIcon = () => {
  return (
    <div className="spinning-icon-container">
      <div className="spinning-icon">
        <img src={loadingIcon} />
      </div>
    </div>
  );
};

export default SpinningIcon;
