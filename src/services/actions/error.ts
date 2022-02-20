import { Dispatch } from "redux";

export const CLEAR_ERROR: "CLEAR_ERROR" = "CLEAR_ERROR";

export interface IClearError {
  readonly type: typeof CLEAR_ERROR;
}

export function clearError() {
  return function (dispatch: Dispatch) {
    dispatch({ type: CLEAR_ERROR });
  };
}
