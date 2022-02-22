import type { Middleware, MiddlewareAPI } from "redux";
import type {
  AppDispatch,
  RootState,
  TApplicationActions,
  TFeedType,
  TWSMiddlewareActions,
} from "../../utils/types";

import { WS_URL } from "../../utils/defaults";

import { getUserAccessToken } from "../user";

const getWSUrl = (type: TFeedType) => {
  switch (type) {
    case "all":
      return `${WS_URL}/orders/all`;
    case "user":
      let token = getUserAccessToken();
      console.log(token);
      token = token.split(" ")[1];
      return `${WS_URL}/orders?token=${token}`;
  }
};

export const socketMiddleware = (
  wsActions: TWSMiddlewareActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    // define socket
    let socket: WebSocket | null = null;
    return (next) => (action: TApplicationActions) => {
      //
      const { onInit, onOpen, onMessage, onError, onClose, onClosed, onSend } =
        wsActions;
      // start process actions
      if (action.type === onInit) {
        const { dispatch, getState } = store;
        const { feed } = getState();
        const url = getWSUrl(feed.type);
        console.log(url);
        // connect
        socket = new WebSocket(url);
        console.log(socket)
        if (socket) {
          // on open
          socket.onopen = (event) => {
            console.log("Socket Open");
            console.log(event);
          };
          // on error
          socket.onerror = (event) => {
            console.log("Socket Error");
            console.log(event);
            dispatch({ type: onError, payload: event });
          };
          // on message
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            console.log(parsedData)
            dispatch({ type: onMessage, payload: parsedData });
          };
          // on close
          socket.onclose = (event) => {
            console.log("Socket Closed");
            console.log(event);
            dispatch({ type: onClosed, payload: event });
          };
        }
      } else if (action.type === onSend) {
        if (socket) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      } else if (action.type === onClose) {
        if (socket) {
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
};
