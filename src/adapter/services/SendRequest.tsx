import { HttpObj, RequestType } from "@adapter/Types";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// you should never use this without commrecoil!!!!!
export const SendRequest = (
  url: string,
  httpObj: HttpObj,
  beforeSend: () => void,
  success: (response: AxiosResponse) => void,
  error: (error: AxiosError) => void,
  complete: () => void,
  contentType: string
) => {
  const extraInformation = {
    MachineName: localStorage.getItem("MachineName"),
    ReactVersion: sessionStorage.getItem("ReactVersion")
  };

  const config: AxiosRequestConfig = {
    headers: {
      ...extraInformation,
      ...(contentType !== "multipart/form-data" && { "Content-Type": contentType }),
      Accept: "application/json"
    },
    withCredentials: true
  };
  beforeSend();
  const body =
    contentType !== "multipart/form-data"
      ? JSON.stringify(httpObj.request.HttpHeaderObj.Body)
      : httpObj.request.HttpHeaderObj.Body;
  switch (httpObj.request.HttpHeaderObj.Type) {
    case RequestType.GET:
      axios
        .get(url, {
          headers: {
            ...extraInformation
          },
          withCredentials: true
        })
        .then((response) => {
          success(response);
        })
        .catch((e) => {
          error(e);
        })
        .then(() => {
          complete();
        });
      break;
    case RequestType.POST:
      axios
        .post(url, body, config)
        .then((response) => {
          success(response);
        })
        .catch((e) => {
          error(e);
        })
        .then(() => {
          complete();
        });
      break;
    case RequestType.PUT:
      axios
        .put(url, JSON.stringify(httpObj.request.HttpHeaderObj.Body), config)
        .then((response) => {
          success(response);
        })
        .catch((e) => {
          error(e);
        })
        .then(() => {
          complete();
        });
      break;
    case RequestType.DELETE:
      config.data = JSON.stringify(httpObj.request.HttpHeaderObj.Body);
      axios
        .delete(url, config)
        .then((response) => {
          success(response);
        })
        .catch((e) => {
          error(e);
        })
        .then(() => {
          complete();
        });
      break;
    default:
      throw new Error("Request type is invalid");
  }
};
