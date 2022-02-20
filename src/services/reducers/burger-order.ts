import { TOrder } from "../../utils/types";
import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  CLEAR_ORDER_DATA,
  TOrderActions,
} from "../actions/burger-order";

const initialState: TOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action:TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        orderRequest: false,
        orderFailed: false,
      };
    case GET_ORDER_FAILED:
      return {
        ...initialState, orderFailed: true
      };
    case CLEAR_ORDER_DATA:
      return initialState;
    default:
      return state;
  }
};
