import { API_URL } from "../../utils/defaults";
import { setUserData } from "../user";
import { SET_ERROR_MESSAGE, SET_ERROR_SOURCE } from "./error";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const FORGOT_PASS_REQUEST = "FORGOT_PASS_REQUEST";
export const FORGOT_PASS_ERROR = "FORGOT_PASS_ERROR";
export const FORGOT_PASS_SUCCESS = "FORGOT_PASS_SUCCESS";

export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_ERROR = "RESET_PASS_ERROR";

const apiRequest = (endpoint, data) => {
  const options = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  };
  return fetch(API_URL + endpoint, options);
};

export function registerUser(user, email, password) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    apiRequest("/auth/register", {
      name: user,
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User Register Error: " + response.statusText);
        }
      })
      .then((result) => {
        if (result.success) {
          const userData = (({ success, accessToken, ...data }) => data)({
            ...result,
          });
          setUserData(userData);
          const authData = (({ success, refreshToken, ...data }) => data)({
            ...result,
          });
          dispatch({
            type: REGISTER_SUCCESS,
            payload: authData,
          });
        } else {
          throw new Error("User Register JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({ type: REGISTER_ERROR });
        dispatch({ type: SET_ERROR_MESSAGE, payload: error });
        dispatch({ type: SET_ERROR_SOURCE, payload: "New User Registration" });
      });
  };
}
