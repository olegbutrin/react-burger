import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  PROFILE_ERROR,
  UPDATE_PROFILE_ERROR,
  FORGOT_PASS_ERROR,
  RESET_PASS_ERROR,
} from "../actions/auth";

const initialState = {
  source: "",
  message: "",
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
      return {
        ...state,
        source: action.payload.source,
        message: action.payload.message,
      };
    default:
      return { ...state };
  }
};
