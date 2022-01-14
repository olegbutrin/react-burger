import { REGISTER_SUCCESS } from "../actions/auth";

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
    default:
      return {...state};
  }
};
