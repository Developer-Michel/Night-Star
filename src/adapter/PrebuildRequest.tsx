import {
  BookType,
  BookDto,
  BookUser,
  FeedbackType,
  GoalType,
  TrackingData,
  UserDto,
  NotificationDTO,
  NotificationUser,
  TaskDto,
  PostType,
  PostReactionType
} from "types/Types";
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
    server: {
      ping(requestData: AddRequestInterfaceWithoutSender<string>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Server/Ping`, "Waking up the server")
          })
        );
      }
    },
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
      getStreakCount(requestData: AddRequestInterface<{ userId: number }, number>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Tracker/GetStreakCount?userId=${requestData.dto.userId}`,
              "Loading information for you"
            )
          })
        );
      },
      getDatas(requestData: AddRequestInterface<{ userId: number; startDate: Date; endDate: Date }, TrackingData[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Tracker/GetDatas?userId=${requestData.dto.userId}&&startdate=${format(
                requestData.dto.startDate,
                "yyyy-MM-dd"
              )}&&endDate=${format(requestData.dto.endDate, "yyyy-MM-dd")}`,
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
    },
    notification: {
      getAll(requestData: AddRequestInterface<{ userId: number }, NotificationDTO[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `Notification/GetAll?userId=${requestData.dto.userId}`,
              `Loading information for you`
            )
          })
        );
      },

      add(requestData: AddRequestInterfaceWithoutReciever<Notification>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Notification/Add`, "Update...", requestData.dto)
          })
        );
      },
      AddNoticeNotifications(requestData: AddRequestInterfaceWithoutReciever<NotificationUser[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.POST,
              `Notification/AddNoticeNotifications`,
              "Update...",
              requestData.dto
            )
          })
        );
      },
      delete(requestData: AddRequestInterfaceWithoutReciever<Notification>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.DELETE, `Notification/Delete`, "Update...", requestData.dto)
          })
        );
      },
      update(requestData: AddRequestInterfaceWithoutReciever<Notification>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Notification/Update`, "Update...", requestData.dto)
          })
        );
      }
    },
    toDoTask: {
      getAll(requestData: AddRequestInterface<{ userId: number }, TaskDto[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `ToDoTask/GetAll?userId=${requestData.dto.userId}`,
              `Loading information for you`
            )
          })
        );
      },
      get(requestData: AddRequestInterface<{ taskId: number }, TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.GET,
              `ToDoTask/Get?taskId=${requestData.dto.taskId}`,
              `Loading information for you`
            )
          })
        );
      },
      add(requestData: AddRequestInterface<TaskDto, TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `ToDoTask/Add`, "Update...", requestData.dto)
          })
        );
      },
      delete(requestData: AddRequestInterfaceWithoutReciever<TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.DELETE, `ToDoTask/Delete`, "Update...", requestData.dto)
          })
        );
      },
      DeleteAndRecreate(requestData: AddRequestInterfaceWithoutReciever<TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.DELETE,
              `ToDoTask/DeleteAndRecreate`,
              "Update...",
              requestData.dto
            )
          })
        );
      },
      update(requestData: AddRequestInterfaceWithoutReciever<TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `ToDoTask/Update`, "Update...", requestData.dto)
          })
        );
      },
      CompleteTask(requestData: AddRequestInterfaceWithoutReciever<TaskDto>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `ToDoTask/CompleteTask`, "Update...", requestData.dto)
          })
        );
      }
    },
    post: {
      getAll(requestData: AddRequestInterfaceWithoutSender<PostType[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Post/GetAll`, `Loading information for you`)
          })
        );
      },

      add(requestData: AddRequestInterfaceWithoutReciever<PostType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Post/Add`, "Update...", requestData.dto)
          })
        );
      },
      delete(requestData: AddRequestInterfaceWithoutReciever<PostType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.DELETE, `Post/Delete`, "Update...", requestData.dto)
          })
        );
      },
      getAllPostReactions(requestData: AddRequestInterfaceWithoutSender<PostReactionType[]>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.GET, `Post/GetAllPostReactions`, `Loading information for you`)
          })
        );
      },

      addPostReaction(requestData: AddRequestInterfaceWithoutReciever<PostReactionType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Post/AddPostReaction`, "Update...", requestData.dto)
          })
        );
      },
      removePostReaction(requestData: AddRequestInterfaceWithoutReciever<PostReactionType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(
              RequestType.DELETE,
              `Post/RemovePostReaction`,
              "Update...",
              requestData.dto
            )
          })
        );
      },
      update(requestData: AddRequestInterfaceWithoutReciever<PostType>) {
        addRequest(
          new RequestObj({
            ...requestData,
            HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `Post/Update`, "Update...", requestData.dto)
          })
        );
      }
    },
    upload: {
      upload(requestData: AddRequestInterface<FormData, string>) {
        addRequest(
          new RequestObj({
            ...requestData,
            ContentType: "multipart/form-data",
            HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `Upload/Upload`, "Update...", requestData.dto)
          })
        );
      }
    }
  };
};
