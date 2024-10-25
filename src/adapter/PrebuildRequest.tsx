import { TrackingData, UserDto } from "types/Types";
import {
  RequestObj,
  HttpHeaderObj,
  RequestType,
  AddRequestInterfaceWithoutReciever,
  AddRequestInterface,
  AddRequestInterfaceWithoutSender
} from "./Types";
import { format } from "date-fns";

/**
 * this function will be called from {@link context/CommProvider.CommProvider}
 * @param addRequest - this is will add a request to the pool of request saved in a recoil state and send to the api
 * @returns a structure of all the possible api call
 */
export const buildPrebuildRequest = (addRequest: (obj: RequestObj) => void) => {
  return {
    tracker: {
      put(requestData: AddRequestInterfaceWithoutReciever<TrackingData>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Tracker`, `Update...`, requestData.dto)
          })
        );
      },
      get(requestData: AddRequestInterface<{ userId: number; date: Date }, TrackingData>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Tracker/?userId=${requestData.dto.userId}&&date=${format(requestData.dto.date, "yyyy-MM-dd")}`,
              "Loading information for you"
            )
          })
        );
      },
      getDatas(
        requestData: AddRequestInterface<{ userId: number; startDate: string; endDate: string }, TrackingData[]>
      ) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Tracker/GetDatas?userId=${requestData.dto.userId}&&startdate=${requestData.dto.startDate}&&endDate=${requestData.dto.endDate}`,
              "Loading information for you"
            )
          })
        );
      }
    },
    login: {
      registerNewNip(requestData: AddRequestInterfaceWithoutReciever<TrackingData>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Login/RegisterNewNip`, `Update...`, requestData.dto)
          })
        );
      },
      getAllUser(requestData: AddRequestInterfaceWithoutSender<UserDto[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Login/GetAllUser`, "Loading information for you")
          })
        );
      },
      login(requestData: AddRequestInterface<{ userId: number; nip: string }, TrackingData[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Login/Login?userId=${requestData.dto.userId}&&nip=${requestData.dto.nip}`,
              "Loading information for you"
            )
          })
        );
      }
    }
  };
};
