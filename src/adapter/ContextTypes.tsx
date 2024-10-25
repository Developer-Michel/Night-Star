import { RequestObj } from "@adapter/Types";

export interface CommData {
  addRequest: (obj: RequestObj) => void;
}
