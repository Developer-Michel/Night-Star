import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { CommProvider } from "@adapter/CommProvider.tsx";
import { DataContextProvider } from "@context/DataContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <ToastContainer />
      <CommProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </CommProvider>
    </RecoilRoot>
  </StrictMode>
);
