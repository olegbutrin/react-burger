import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  FORGOT_PASS_SUCCESS,
  RESET_PASS_SUCCESS,
} from "../actions/auth";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  isLogged: false,
  accessToken: "",
  expired: 0,
  isForgot: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        expired: action.payload.expired,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isLogged: false,
        accessToken: initialState.accessToken,
        expired: initialState.expired,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        expired: action.payload.expired,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLogged: false,
        accessToken: initialState.accessToken,
        expired: initialState.expired,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogged: initialState.isLogged,
        accessToken: initialState.accessToken,
        expired: initialState.expired,
      };
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        isForgot: true,
      };
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        isForgot: false,
      };
    default:
      return { ...state };
  }
};
