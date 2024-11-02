import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { CommProvider } from "@adapter/CommProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServerConnection } from "@component/assets/server-connection/ServerConnection.tsx";
import { DataContextProvider } from "@context/DataProvider.tsx";
import "./App.scss";
import { LayoutContextProvider } from "@context/LayoutProvider.tsx";
import { UserDataContextProvider } from "@context/UserDataProvider.tsx";
import { Router } from "@component/router/router";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <ToastContainer />
      <CommProvider>
        <DataContextProvider>
          <ServerConnection />
          <UserDataContextProvider>
            <LayoutContextProvider>
              <Router />
            </LayoutContextProvider>
          </UserDataContextProvider>
        </DataContextProvider>
      </CommProvider>
    </RecoilRoot>
  </StrictMode>
);
