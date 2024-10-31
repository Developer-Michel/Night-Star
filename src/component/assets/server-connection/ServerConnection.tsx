import { useComm } from "@hooks/useComm";
import { useEffect, useState } from "react";
import "./ServerConnection.scss";
export const ServerConnection = () => {
  const [serverConnected, setServerConnected] = useState(false);
  const { api } = useComm();
  useEffect(() => {}, []);
  //   if (!serverConnected)
  //     return (
  //       <>
  //         <div className="server-connection-loader">
  //           <div className="center-content">
  //             <img src={"public/assets/lotus.png"} />
  //             <div></div>
  //           </div>
  //         </div>
  //       </>
  //     );
  return <></>;
};
