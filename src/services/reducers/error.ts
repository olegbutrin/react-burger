import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  PROFILE_ERROR,
  UPDATE_PROFILE_ERROR,
  FORGOT_PASS_ERROR,
  RESET_PASS_ERROR,
  UPDATE_TOKEN_ERROR,
} from "../constants/auth";

import { TAuthError } from "../actions/auth";
import { CLEAR_ERROR, IClearError } from "../actions/error";
import { TError } from "../../utils/types";

const initialState: TError = {
  source: "",
  message: "",
};

export const errorReducer = (
  state = initialState,
  action: TAuthError | IClearError
) => {
  switch (action.type) {
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case PROFILE_ERROR:
    case UPDATE_PROFILE_ERROR:
    case FORGOT_PASS_ERROR:
    case RESET_PASS_ERROR:
    case UPDATE_TOKEN_ERROR:
    case CLEAR_ERROR:
      return { ...initialState };
    default:
      return state;
  }
};
