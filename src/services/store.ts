import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "../services/middleware/websocket";

import { TWSMiddlewareActions } from "../utils/types";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
} from "../services/constants/websocket";

import {FEED_FETCH_ORDERS, FEED_RECEIVE_ORDERS} from "../services/constants/feed";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsActions: TWSMiddlewareActions = {
  onInit: WS_CONNECTION_START,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CLOSE,
  onClosed: WS_CONNECTION_CLOSED,
  onSend: WS_SEND_MESSAGE,
  onOpen: FEED_FETCH_ORDERS,
  onMessage: FEED_RECEIVE_ORDERS,
};

const wsMiddleware = socketMiddleware(wsActions);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware));

export const store = createStore(rootReducer, enhancer);
