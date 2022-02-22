import { Dispatch } from "redux";

import * as constants from "../constants/feed";

import { TFeedFeed, TFeedServerMessage, TFeedType } from "../../utils/types";

export interface IFeedSetType {
  readonly type: typeof constants.FEED_SET_TYPE;
  readonly payload: TFeedType;
}

export interface IFeedReceiveOrders {
  readonly type: typeof constants.FEED_RECEIVE_ORDERS;
  readonly payload: TFeedServerMessage;
}

export type TFeedActions = IFeedSetType  | IFeedReceiveOrders; 

export function setFeedType(type: TFeedType) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.FEED_SET_TYPE, payload: type });
  };
}
