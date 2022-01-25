import { API_URL, TOKEN_EXPIRED } from "../../utils/defaults";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserData,
  setUserProfile,
  updateUserRefreshToken,
  setUserIsLogged,
} from "../user";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_ERROR = "UPDATE_TOKEN_ERROR";

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

export const RESTORE_USER = "RESTORE_USER";

const apiRequest = (endpoint, data, method) => {
  const options = {
    method: method || "POST",
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

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status}`);
  }
};

const setAuthData = (serverData, expired) => {
  const userData = (({ success, ...data }) => {
    return { ...data, expired: expired };
  })({
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
          const authData = setAuthData(result, expired);
          dispatch({
            type: REGISTER_SUCCESS,
            payload: { ...authData, expired: expired },
          });
          setUserIsLogged(true);
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
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          const expired = new Date().getTime() + TOKEN_EXPIRED;
          const authData = setAuthData(result, expired);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...authData, expired: expired },
          });
          setUserIsLogged(true);
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

export function logoutUser() {
  const refreshToken = getUserRefreshToken();
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    apiRequest("/auth/logout", { token: refreshToken })
      .then(checkResponse)
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        setUserIsLogged(false);
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_ERROR,
          payload: { source: "User Logout", message: error },
        });
      });
  };
}

export function restoreUser(userData) {
  return function (dispatch) {
    dispatch({type: RESTORE_USER, payload: userData});
  }
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASS_REQUEST });
    apiRequest("/password-reset", { email: email })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          dispatch({
            type: FORGOT_PASS_SUCCESS,
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
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Reset password request: " + response.statusText);
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch({
            type: RESET_PASS_SUCCESS,
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

export function updateAllTokens() {
  const refreshToken = getUserRefreshToken();
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    apiRequest("/auth/token", { token: refreshToken })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          updateUserRefreshToken(result.refreshToken);
          const expired = new Date().getTime() + TOKEN_EXPIRED;
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
            payload: { accessToken: result.accessToken, expired: expired },
          });
        } else {
          throw new Error("User Update Token JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_TOKEN_ERROR,
          payload: { source: "Update token", message: error },
        });
      });
  };
}

export function getProfile() {
  return function (dispatch) {
    dispatch({ type: PROFILE_REQUEST });
    const url = `${API_URL}/auth/user`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getUserAccessToken(),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Update user profile request: " + response.statusText
          );
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch({ type: PROFILE_SUCCESS, payload: result.user });
          setUserProfile(result.user);
        } else {
          throw new Error("User Profile JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: PROFILE_ERROR,
          payload: { source: "Get User Error", message: error.message },
        });
      });
  };
}

export function setProfile(email, name, password) {
  return function (dispatch) {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const url = `${API_URL}/auth/user`;
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getUserAccessToken(),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, name, password }),
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Update user profile request: " + response.statusText
          );
        }
      })
      .then((result) => {
        if (result.success) {
          dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: result.user });
          setUserProfile(result.user);
        } else {
          throw new Error("User Profile JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
          payload: { source: "Set User Error", message: error.message },
        });
      });
  };
}
