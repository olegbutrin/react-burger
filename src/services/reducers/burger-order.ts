import { TOrder } from "../../utils/types";
import * as constants from "../constants/burger-order";

import { TOrderActions } from "../actions/burger-order";

const initialState: TOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action:TOrderActions) => {
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
        ...initialState, orderFailed: true
      };
    case constants.CLEAR_ORDER_DATA:
      return initialState;
    default:
      return state;
  }
};
