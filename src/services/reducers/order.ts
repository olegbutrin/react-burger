import { Reducer } from "redux";

import * as constants from "../constants/order";

import { TOrderStore } from "../../utils/types";
import { TOrderDetails, TOrderError } from "../actions/order";

const initialState: TOrderStore = {
  request: false,
  order: null,
};

type TOrderActions = TOrderDetails | TOrderError;

export const orderDetailsReducer: Reducer<TOrderStore, TOrderActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.ORDER_DETAILS_REQUEST:
      return { ...state, request: true };
    case constants.ORDER_DETAILS_SUCCESS:
      return { ...state, request: false, order: action.payload };
    case constants.ORDER_DETAILS_ERROR:
      return { ...state, request: false, order: null };
    default:
      return state;
  }
};
