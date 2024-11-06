import { useRef } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Id, toast } from "react-toastify";
import { atom, useSetRecoilState } from "recoil";

import { HttpObj, RequestObj, RequestState } from "@adapter/Types";
import { SendRequest } from "@adapter/services/SendRequest";
import { CommContext } from "./CommContext";
import { changeHttpObjStateAndReturnState } from "./services/UpdateCommState";

export const CommProvider = (props: { children: React.ReactNode }) => {
  const setLoadingListView = useSetRecoilState(commPropsState);
  const loadingList = useRef<HttpObj[]>([]);
  const idIncr = useRef(0);
  const syncList = useRef<HttpObj[]>([]);
  const currentSyncId = useRef(0);
  function addRequest(obj: RequestObj) {
    const state = obj.Async
      ? RequestState.sent //if assync sent
      : syncList.current.length === 0
      ? RequestState.sent
      : RequestState.request; //if sync and no other already sent then sent else request
    const httpObj: HttpObj = {
      id: idIncr.current++,
      request: obj,
      response: null,
      state: state
    };
    loadingList.current = changeHttpObjStateAndReturnState(loadingList.current, { type: "ADD", httpObj: httpObj });
    setLoadingListView(loadingList.current);
    if (obj.Async) {
      executeRequest(httpObj);
      return;
    }
    syncList.current.push(httpObj);
    if (httpObj.state === RequestState.sent) {
      currentSyncId.current = httpObj.id;
      executeRequest(httpObj);
    }
  }

  function doneSync() {
    let httpObj = syncList.current.shift();
    if (httpObj?.id === currentSyncId.current)
      //to skip the auto send request at line 141
      httpObj = syncList.current.shift();
    if (httpObj != null) executeRequest(httpObj);
  }

  function executeRequest(httpObj: HttpObj) {
    let toastId: Id;
    const beforeSend = () => {
      httpObj.request.BeforeSend();
      if (httpObj.request.Notify) toastId = toast.loading("Please wait...");
    };
    const success = (response: AxiosResponse) => {
      httpObj.request.Success(response.data);

      loadingList.current = changeHttpObjStateAndReturnState(loadingList.current, {
        type: "COMPLETE",
        httpObj,
        id: httpObj.id,
        response
      });
      setLoadingListView(loadingList.current);
      if (httpObj.request.Notify) {
        toast.update(toastId, {
          render: "SUCCESS",
          type: "success",
          isLoading: false,
          autoClose: 1500
        });
      }
    };
    const error = (error: AxiosError): string => {
      const response = error.response;
      let message = "Error";
      // The data in the response from the server
      if (response) {
        const data = response.data;
        if (data) message = String(data);
        else message = error?.message ?? "Server error check log for more information!";
        if (message)
          try {
            if (message.includes("||")) message = message.split("||")[0];
          } catch {
            console.log(message);
          }
        loadingList.current = changeHttpObjStateAndReturnState(loadingList.current, {
          type: "COMPLETE",
          httpObj,
          id: httpObj.id,
          response: error.response
        });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message = "error while accessing the server";
        loadingList.current = changeHttpObjStateAndReturnState(loadingList.current, {
          type: "COMPLETE",
          httpObj,
          id: httpObj.id,
          response: error.request
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        message = error.message;
        loadingList.current = changeHttpObjStateAndReturnState(loadingList.current, {
          type: "COMPLETE",
          httpObj,
          id: httpObj.id,
          response: error.request
        });
      }
      if (httpObj.request.Notify || httpObj.request.NotifyError) {
        if (toastId)
          toast.update(toastId, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 1500
          });
        else toast.error(message);
      }
      setLoadingListView(loadingList.current);
      httpObj.request.Error(message);
      return message;
    };
    const complete = () => {
      if (!httpObj.request.Async) doneSync();
      httpObj.request.Complete();
    };
    const url = import.meta.env.VITE_API_URL + httpObj.request.HttpHeaderObj.Url;
    const contentType = httpObj.request.ContentType;
    SendRequest(url, httpObj, beforeSend, success, error, complete, contentType);
  }

  return (
    <CommContext.Provider
      value={{
        addRequest: addRequest
      }}>
      {props.children}
    </CommContext.Provider>
  );
};
const commPropsState = atom<HttpObj[]>({
  key: "commPropsState",
  default: []
});
