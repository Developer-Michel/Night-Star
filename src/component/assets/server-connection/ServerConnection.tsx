import { useComm } from "@hooks/useComm";
import { useEffect, useState } from "react";
import "./ServerConnection.scss";
import SpinningIcon from "../loading-icon/LoadingIcon";
import messages from "src/RandomAssLoadingQuote.json";
import { UserDto } from "types/Types";
import { toast } from "react-toastify";
import lotus from "public/assets/lotus.png";
export const ServerConnection = () => {
  const [serverConnected, setServerConnected] = useState(false);
  const user: UserDto | null = JSON.parse(localStorage.getItem("selectedUser") ?? "null");
  const { api } = useComm();
  useEffect(() => {
    api.server.ping({
      Success: () => {
        setServerConnected(true);
      },
      Error: (e) => {
        toast.error("Error no connection to the server: " + e);
      },
      NotifyError: false
    });
  }, []);
  if (!serverConnected)
    return (
      <>
        <div className="server-connection-loader">
          <div className="center-content">
            <img src={lotus} />
            <div className="server-connection-welcome">WELCOME {user?.UserName ?? "USER"}</div>
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
      </>
    );
  return <></>;
};
const LoadingQuote = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change message every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);
  return <div className="loading-message">{messages[index]}</div>;
};
