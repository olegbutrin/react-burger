import { API_URL, TOKEN_EXPIRED } from "../../utils/defaults";
import { setUserData } from "../user";

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

const setAuthData = (serverData) => {
  const userData = (({ success, accessToken, ...data }) => data)({
    ...serverData,
  });
  setUserData(userData);
  const authData = (({ success, refreshToken, ...data }) => data)({
    ...serverData,
  });
  return authData;
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
          const expired = new Date().getTime() + TOKEN_EXPIRED;
          const authData = setAuthData(result);
          dispatch({
            type: REGISTER_SUCCESS,
            payload: { ...authData, expired: expired },
          });
        } else {
          throw new Error("User Register JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: { source: "New User Registration", message: error },
        });
      });
  };
}

export function loginUser(email, password) {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    apiRequest("/auth/login", { email: email, password: password })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User Login Error: " + response.statusText);
        }
      })
      .then((result) => {
        if (result.success) {
          const expired = new Date().getTime() + TOKEN_EXPIRED;
          const authData = setAuthData(result);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...authData, expired: expired },
          });
        } else {
          throw new Error("User Login JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: { source: "User Login", message: error },
        });
      });
  };
}

export function logoutUser(refreshToken) {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    apiRequest("/auth/logout", { token: refreshToken })
      .then((response) => {
        if (response.ok) {
          dispatch({ type: LOGOUT_SUCCESS });
        } else {
          throw new Error("User Logout Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_ERROR,
          payload: { source: "User Logout", message: error },
        });
      });
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASS_REQUEST });
    apiRequest("/password-reset", { email: email })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Forgot password request: " + response.statusText);
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: FORGOT_PASS_SUCCESS
          });
        } else {
          throw new Error("Forgot Password JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: FORGOT_PASS_ERROR,
          payload: { source: "Forgot Password", message: error },
        });
      });
  };
}

export function resetPassword(email, password, token) {
  return function (dispatch) {
    dispatch({ type: RESET_PASS_REQUEST });
    apiRequest("/password-reset", { password: password, token: token })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Reset password request: " + response.statusText);
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: RESET_PASS_SUCCESS
          });
          loginUser(email, password);
        } else {
          throw new Error("Reset Password JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASS_ERROR,
          payload: { source: "Reset Password", message: error },
        });
      });
  };
}
