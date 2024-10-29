import { BookType, BookDto, BookUser, FeedbackType, GoalType, TrackingData, UserDto } from "types/Types";
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
    },
    goal: {
      getAllGoals(requestData: AddRequestInterface<{ userId: number }, GoalType[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Goal/GetAllGoals?userId=${requestData.dto.userId}`,
              `Loading information for you`,
              requestData.dto
            )
          })
        );
      },
      addGoal(requestData: AddRequestInterfaceWithoutReciever<GoalType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Goal/AddGoal`, "Update...", requestData.dto)
          })
        );
      },
      deleteGoal(requestData: AddRequestInterfaceWithoutReciever<GoalType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.DELETE, `Goal/DeleteGoal`, "Update...", requestData.dto)
          })
        );
      },
      updateGoal(requestData: AddRequestInterfaceWithoutReciever<GoalType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Goal/UpdateGoal`, "Update...", requestData.dto)
          })
        );
      }
    },
    feedback: {
      getAllFeedbacks(requestData: AddRequestInterfaceWithoutSender<FeedbackType[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Feedback/GetAllFeedbacks`, `Loading information for you`)
          })
        );
      },
      addFeedback(requestData: AddRequestInterfaceWithoutReciever<FeedbackType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Feedback/AddFeedback`, "Update...", requestData.dto)
          })
        );
      },
      deleteFeedback(requestData: AddRequestInterfaceWithoutReciever<FeedbackType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.DELETE,
              `Feedback/DeleteFeedback`,
              "Update...",
              requestData.dto
            )
          })
        );
      },
      updateFeedback(requestData: AddRequestInterfaceWithoutReciever<FeedbackType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Feedback/UpdateFeedback`, "Update...", requestData.dto)
          })
        );
      }
    },
    book: {
      getAllBooks(requestData: AddRequestInterfaceWithoutSender<BookDto[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Book/GetAllBooks`, `Loading information for you`)
          })
        );
      },
      addBook(requestData: AddRequestInterfaceWithoutReciever<BookType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Book/AddBook`, "Update...", requestData.dto)
          })
        );
      },
      updateBook(requestData: AddRequestInterfaceWithoutReciever<BookType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Book/UpdateBook`, "Update...", requestData.dto)
          })
        );
      },
      updateBookUser(requestData: AddRequestInterfaceWithoutReciever<BookUser>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Book/UpdateBookUser`, "Update...", requestData.dto)
          })
        );
      }
    }
  };
};
