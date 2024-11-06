/**
 * loading type ui for user
 * @category communication
 */
export enum LoadingType {
  /** fullloading screen*/
  full,
  /**none */
  none,
  /**show loading screen transparent after 2s if not done */
  normal
}

/**
 * the current state of the request
 * @category communication
 */
export enum RequestState {
  /**requested, waiting to be sent */
  request,
  /**sent waiting on server response*/
  sent,
  /**request done and response received */
  completed
}
/**
 *  this contains every information for the request to be process by the function execute request inside CommProvider
 *  @category communication
 */
export interface HttpObj {
  id: number;
  /**state of the request */
  state: RequestState;
  /**request info like body url loading type... */
  request: RequestObj;
  /**response message and status of the request */
  response: ResponseObj | null;
}
/**
 *  @category communication
 */
export enum RequestType {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}
/**
 * @category communication
 */
export class HttpHeaderObj {
  /**type of the request  get post ... */
  Type: RequestType;
  /** */
  Url: string;
  Body: unknown | null;
  Title: string;
  constructor(Type: RequestType, Url: string, Title: string, Body: unknown | null = null) {
    this.Type = Type;
    this.Url = Url;
    this.Body = Body;
    this.Title = Title;
  }
}
/**
 * init after the request has been proccessed and returned from the api
 * @category communication
 */
export class ResponseObj {
  Status: number;
  Response: string;
  constructor({ Status = RequestState.completed, Response = "" }: { Status?: number; Response?: string }) {
    this.Status = Status;
    this.Response = Response;
  }
}
/**
 * the request obj containing all the information and function of a request ,names are pretty self explenatory
 * @category communication
 *
 */
export class RequestObj {
  /**
   * The type of loading indicator that we want to show to the user
   * @defaultValue LoadingType.normal
   */
  LoadingType: LoadingType;
  HttpHeaderObj: HttpHeaderObj;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Success: (obj: any) => void;
  Error: (message: string) => void;
  BeforeSend: () => void;
  Complete: () => void;

  /**
   * this will determine if we put a toast in the ui that will stay there and update following the request status until it is done
   * @defaultValue false
   */
  Notify: boolean;
  /**
   * this will determine if we notify the user when the request has failed with an error toast
   * @defaultValue true
   */
  NotifyError: boolean;
  /**
   * set to false to process this request in sync with other request in sync that you dont want to be processed asyncly example print that need to be in order of printing
   * @defaultValue true;
   */
  Async: boolean;
  /**
   * @deprecated
   * was used in the past will be removed soon!
   */
  Timeout: NodeJS.Timeout | null;
  ContentType: string;
  /**
   * Constructor that will fill all the undefined value to their default value
   *
   */

  constructor({
    LoadingType = 1 as LoadingType,
    HttpHeaderObj,
    Success = () => {},
    Error = () => {},
    BeforeSend = () => {},
    Complete = () => {},
    Notify = false,
    NotifyError = true,
    Async = true,
    Timeout = null,
    ContentType = "application/json"
  }: RequestObjInterface) {
    this.LoadingType = LoadingType;
    this.HttpHeaderObj = HttpHeaderObj;
    this.Success = Success;
    this.Error = Error;
    this.BeforeSend = BeforeSend;
    this.Complete = Complete;
    this.Notify = Notify;
    this.Async = Async;
    this.Timeout = Timeout;
    this.NotifyError = NotifyError;
    this.ContentType = ContentType;
  }
}
/**
 * Interface used by request obj to know the definition of value go to
 * {@link RequestObj}
 * @category communication
 *
 */
export interface RequestObjInterface {
  LoadingType?: LoadingType;
  HttpHeaderObj: HttpHeaderObj;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Success?: (obj: any) => void;
  Error?: (message: string) => void;
  BeforeSend?: () => void;
  Complete?: () => void;
  Notify?: boolean;
  NotifyError?: boolean;
  Async?: boolean;
  /**@deprecated */
  Timeout?: NodeJS.Timeout | null;
  ContentType?: string;
}
/**
 * @description interface that represent the option of the request when we build the request
 * @category communication
 * @example
 * api.sap.update.document.add({dto:doc,options:{success:(result)=>saveResult(result)}});
 */
export interface RequestOption<T> {
  LoadingType?: LoadingType;
  Success: (obj: T) => void;
  Error?: (message: string) => void;
  BeforeSend?: () => void;
  Complete?: () => void;
  Notify?: boolean;
  NotifyError?: boolean;
  Async?: boolean;
}
/**
 * @description interface that represent the options of a request that doesnt return any object so the success value becomes optionnal as it reuturn nothing
 * @category communication
 * @satisfies buildPrebuildRequest
 * @example
 * api.sap.update.document.update({dto:doc});
 */
export interface RequestOptionWithoutReceiver {
  LoadingType?: LoadingType;
  Success?: () => void;
  Error?: (message: string) => void;
  BeforeSend?: () => void;
  Complete?: () => void;
  Notify?: boolean;
  NotifyError?: boolean;
  Async?: boolean;
}
/**
* @description interface that represent  a request that that will send and receive data
* @category communication
* @satisfies buildPrebuildRequest
* @example
*  add(requestData: AddRequestInterface<DocumentModel, number>) {
                      addRequest(
                          new RequestObj({
                              ...requestData,
                              HttpHeaderObj: new HttpHeaderObj(RequestType.POST, `sap/update/document/Add`, "Creating document", requestData.dto)
                          })
                      )
                  }
*/
export interface AddRequestInterface<DTO, RecievedDataType> extends RequestOption<RecievedDataType> {
  dto: DTO;
}
/**
* @description interface that represent  a request that that will send data without receiving any data except a status response
* @category communication
* @satisfies buildPrebuildRequest
* @example
*   update(requestData: AddRequestInterfaceWithoutReciever<DocumentModel>) {
                      addRequest(
                          new RequestObj({
                              ...requestData,
                              HttpHeaderObj: new HttpHeaderObj(RequestType.PUT, `sap/update/document/Update`, "Updating document", requestData.dto)
                          })
                      )
                  }
*/
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddRequestInterfaceWithoutSender<RecievedDataType> extends RequestOption<RecievedDataType> {}
/**
* @description interface that represent  a request that that will send data without receiving any data except a status response
* @category communication
* @satisfies buildPrebuildRequest
* @example
*   get(requestData: AddRequestInterfaceWithoutReciever<DocumentModel>) {
                      addRequest(
                          new RequestObj({
                              ...requestData,
                              HttpHeaderObj: new HttpHeaderObj(RequestType.Get, `sap/read/document/Get`, "Get document", requestData.dto)
                          })
                      )
                  }
*/
export interface AddRequestInterfaceWithoutReciever<DTO> extends RequestOptionWithoutReceiver {
  //Will receive most likely the default "Success" that I setted when a good request without response is sent so no need to give it a type since it will never be called
  dto: DTO;
}
