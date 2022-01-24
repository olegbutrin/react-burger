import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  PROFILE_ERROR,
  UPDATE_PROFILE_ERROR,
  FORGOT_PASS_ERROR,
  RESET_PASS_ERROR,
  UPDATE_TOKEN_ERROR,
} from "../actions/auth";

import { SET_ERROR, CLEAR_ERROR } from "../actions/error";

const initialState = {
  source: "",
  message: "",
};

const errorMessage = (message) => {
  switch (message.constructor.name) {
    case "String":
      return message;
    case "Error":
      return message.message;
    default:
      return String(message);
  }
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case PROFILE_ERROR:
    case UPDATE_PROFILE_ERROR:
    case FORGOT_PASS_ERROR:
    case RESET_PASS_ERROR:
    case UPDATE_TOKEN_ERROR:
    case SET_ERROR:
      return {
        ...state,
        source: action.payload.source,
        message: errorMessage(action.payload.message),
      };
    case CLEAR_ERROR:
      return { ...initialState };
    default:
      return state;
  }
};
