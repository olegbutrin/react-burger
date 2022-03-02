import { Dispatch } from "redux";

import * as constants from "../constants/error"

export interface IClearError {
  readonly type: typeof constants.CLEAR_ERROR;
}

export function clearError() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.CLEAR_ERROR });
  };
}
