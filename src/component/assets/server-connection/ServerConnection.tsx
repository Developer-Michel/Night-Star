import { useComm } from "@hooks/useComm";
import { useEffect, useState } from "react";
import "./ServerConnection.scss";
import SpinningIcon from "../loading-icon/LoadingIcon";
import messages from "src/RandomAssLoadingQuote.json";
import { UserDto } from "types/Types";
import { toast } from "react-toastify";
import lotus from "public/assets/lotus.png";
export const ServerConnection = () => {
  const user: UserDto | null = JSON.parse(localStorage.getItem("selectedUser") ?? "null");
  const { api } = useComm();
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  useEffect(() => {
    api.server.ping({
      Success: () => {
        setTimeout(() => {
          setVisible(false);
        }, 100);
        setTimeout(() => {
          setShow(false);
        }, 2100);
      },
      Error: (e) => {
        toast.error("Error no connection to the server: " + e);
      },
      NotifyError: false
    });
  }, []);
  if (show)
    return (
      <div className={`server-connection-loader ${visible && "visible"} `}>
        <div className="center-content">
          <img src={lotus} />
          <div className="server-connection-welcome">WELCOME {user?.UserName ?? "USER"}</div>
        </div>
        <div className="bottom-left-content">
          <div>V{import.meta.env.APP_VERSION}</div>
        </div>
        <div className="bottom-right-content">
          <div style={{ float: "right" }}>
            <SpinningIcon />
          </div>
          <br></br>
          <div style={{ float: "right" }}>
            <LoadingQuote />
          </div>
        </div>
      </div>
    );
  return <></>;
};
const LoadingQuote = () => {
  const [index, setIndex] = useState(Math.floor(Math.random() * messages.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * messages.length)); // Set random index
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [messages.length]);
  return <div className="loading-message">{messages[index]}</div>;
};
