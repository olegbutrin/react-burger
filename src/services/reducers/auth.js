import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../actions/auth";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  isLogged: false,
  accessToken: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isLogged: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLogged: false,
      };
    default:
      return { ...state };
  }
};
