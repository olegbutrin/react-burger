import { Dispatch } from "redux";

import * as constants from "../constants/feed";

import { TFeedTicketMessage, TFeedType } from "../../utils/types";

export interface IFeedSetType {
  readonly type: typeof constants.FEED_SET_TYPE;
  readonly payload: TFeedType;
}

export interface IFeedFetchOrders {
  readonly type: typeof constants.FEED_FETCH_ORDERS;
}

export interface IFeedReceiveOrders {
  readonly type: typeof constants.FEED_RECEIVE_ORDERS;
  readonly payload: TFeedTicketMessage;
}

export type TFeedActions = IFeedSetType | IFeedFetchOrders | IFeedReceiveOrders; 

export function setFeedType(type: TFeedType) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.FEED_SET_TYPE, payload: type });
  };
}
