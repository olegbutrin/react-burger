import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  CLEAR_ORDER_DATA,
} from "../actions/burger-order";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    case CLEAR_ORDER_DATA:
      return initialState;
    default:
      return initialState;
  }
};
