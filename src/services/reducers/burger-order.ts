import { Reducer } from "redux";

import { TOrder } from "../../utils/types";
import * as constants from "../constants/burger-order";

import { TOrderActions } from "../actions/burger-order";

export const initialState: TOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer: Reducer<TOrder, TOrderActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
      };
    case constants.GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orderRequest: false,
        orderFailed: false,
      };
    case constants.GET_ORDER_FAILED:
      return {
        ...initialState,
        orderFailed: true,
      };
    case constants.CLEAR_ORDER_DATA:
      return initialState;
    default:
      return state;
  }
};
