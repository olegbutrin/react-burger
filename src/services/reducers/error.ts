import { Reducer } from "redux";

import * as constants from "../constants/auth";

import { TAuthError } from "../actions/auth";
import { CLEAR_ERROR } from "../constants/error";
import { TWSError } from "../actions/websocket";
import { WS_CONNECTION_ERROR } from "../constants/websocket";
import { IClearError } from "../actions/error";
import { TError } from "../../utils/types";
import { TOrderError } from "../actions/order";
import { ORDER_DETAILS_ERROR } from "../constants/order";

export const initialState: TError = {
  source: "",
  message: "",
};

export const errorReducer: Reducer<TError, TAuthError | TWSError | TOrderError | IClearError  > = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.REGISTER_ERROR:
    case constants.LOGIN_ERROR:
    case constants.LOGOUT_ERROR:
    case constants.PROFILE_ERROR:
    case constants.UPDATE_PROFILE_ERROR:
    case constants.FORGOT_PASS_ERROR:
    case constants.RESET_PASS_ERROR:
    case WS_CONNECTION_ERROR:
    case ORDER_DETAILS_ERROR:
      return { source: action.payload.source, message: action.payload.message };
    case CLEAR_ERROR:
      return { ...initialState };
    default:
      return state;
  }
};
