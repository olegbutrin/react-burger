import { Dispatch } from "redux";

import * as constants from "../constants/websocket";

export interface IWSConnectionStart {
  readonly type: typeof constants.WS_CONNECTION_START;
}

export interface IWSConnectionSuccess {
  readonly type: typeof constants.WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof constants.WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosed {
  readonly type: typeof constants.WS_CONNECTION_CLOSED;
  readonly payload: Event;
}

export interface IWSGetMessage {
  readonly type: typeof constants.WS_GET_MESSAGE;
  readonly payload: string;
}

export interface IWSSendMessage {
  readonly type: typeof constants.WS_SEND_MESSAGE;
  readonly payload: string;
}

export interface IWSClose {
  readonly type: typeof constants.WS_CLOSE;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage
  | IWSSendMessage
  | IWSClose;


  export function wsConnect() {
    return function (dispatch: Dispatch) {
      dispatch({ type: constants.WS_CONNECTION_START});
    };
  }