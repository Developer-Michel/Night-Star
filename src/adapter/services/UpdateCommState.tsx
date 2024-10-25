import { AxiosResponse } from "axios";
import { HttpObj, RequestState, ResponseObj } from "../../adapter/Types";
type IssuesAction = {
    id?: number;
    type: string;
    httpObj?: HttpObj;
    response?: AxiosResponse;
}
export const changeHttpObjStateAndReturnState = (state: HttpObj[], action: IssuesAction): HttpObj[] => {
    switch (action.type) {
        case "ADD":
            if (action.httpObj == null)
                throw new Error("httpObject should exist here");
            return [...state, action.httpObj];
        case "SEND":
            return state.map((httpObj) => {
                if (httpObj.id === action.id) {
                    return { ...httpObj, state: RequestState.sent };
                } else {
                    return httpObj;
                }
            });
        case "COMPLETE":

            if (action.httpObj == null)
                throw new Error("httpObject should exist here");
            return state.map((httpObj) => {
                if (httpObj.id === action.id) {
                    return { ...httpObj, state: RequestState.completed, response: new ResponseObj({ Status: action.response?.status, Response: action.response?.statusText }) };
                } else {
                    return httpObj;
                }
            });

        default:
            return state;
    }
};
