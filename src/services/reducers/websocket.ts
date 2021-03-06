import { Reducer } from "redux";

import * as constants from "../constants/websocket";

import { TWSActions } from "../actions/websocket";

import { TWebsocketState } from "../../utils/types";

export const initialState: TWebsocketState = {
  connected: false,
  messages: [],
  refused: false,
};

export const websocketReducer: Reducer<TWebsocketState, TWSActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
        refused: false,
      };
    case constants.WS_CONNECTION_REFUSED:
      return {
        ...state,
        connected: false,
        refused: true,
      }
    case constants.WS_CONNECTION_CLOSED:
    case constants.WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        connected: false,
      };
    case constants.WS_GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
