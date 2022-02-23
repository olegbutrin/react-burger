import { Reducer } from "redux";

import * as constants from "../constants/feed";
import { TFeedStore } from "../../utils/types";
import { TFeedActions } from "../actions/feed";

export const initialState: TFeedStore = {
  type: "all",
  tickets: [],
  total: 0,
  totalToday: 0,
};

export const feedReducer: Reducer<TFeedStore, TFeedActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.FEED_SET_TYPE:
      return {
        ...state,
        type: action.payload !== state.type ? action.payload : state.type,
        orders:
          action.payload !== state.type ? initialState.tickets : state.tickets,
        total: action.payload !== state.type ? initialState.total : state.total,
        totalToday:
          action.payload !== state.type
            ? initialState.totalToday
            : state.totalToday,
      };
    case constants.FEED_RECEIVE_ORDERS:
      return {
        ...state,
        tickets: action.payload.tickets,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
