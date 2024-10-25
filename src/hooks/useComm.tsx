import { CommContext } from "@adapter/CommContext";
import { buildPrebuildRequest } from "@adapter/PrebuildRequest";
import { useContext } from "react";

export function useComm() {
  const context = useContext(CommContext);

  if (!context) {
    throw new Error("RequestToApi must be used within CommProvider");
  }
  const addRequest = context.addRequest;
  const api = buildPrebuildRequest(addRequest);

  return { api, addRequest };
}
