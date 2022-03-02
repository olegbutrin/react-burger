import { Dispatch } from "redux";
import { API_URL } from "../../utils/defaults";
import {
  getUserAccessToken,
  getUserRefreshToken,
  setUserData,
  setUserProfile,
  updateUserRefreshToken,
  updateUserAccessToken,
  setUserIsLogged,
} from "../user";

import {
  TServerData,
  TUserAuthStats,
  TUserAuthStore,
  TStorageUserData,
  TError,
  TUserPair,
} from "../../utils/types";

import * as constants from "../constants/auth";
import { store } from "../store";

export interface IRegisterRequest {
  readonly type: typeof constants.REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof constants.REGISTER_SUCCESS;
  readonly payload: Partial<TUserAuthStore>;
}

export interface IRegisterError {
  readonly type: typeof constants.REGISTER_ERROR;
  readonly payload: TError;
}

export interface ILoginRequest {
  readonly type: typeof constants.LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof constants.LOGIN_SUCCESS;
  readonly payload: Partial<TUserAuthStore>;
}

export interface ILoginError {
  readonly type: typeof constants.LOGIN_ERROR;
  readonly payload: TError;
}

export interface ILogoutRequest {
  readonly type: typeof constants.LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof constants.LOGOUT_SUCCESS;
}

export interface ILogoutError {
  readonly type: typeof constants.LOGOUT_ERROR;
  readonly payload: TError;
}

export interface IUpdateTokenRequest {
  readonly type: typeof constants.UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccess {
  readonly type: typeof constants.UPDATE_TOKEN_SUCCESS;
  readonly payload: Partial<TUserAuthStore>;
}

export interface IUpdateTokenError {
  readonly type: typeof constants.UPDATE_TOKEN_ERROR;
  readonly payload: TError;
}

export interface IForgotPassRequest {
  readonly type: typeof constants.FORGOT_PASS_REQUEST;
}

export interface IForgotPassSuccess {
  readonly type: typeof constants.FORGOT_PASS_SUCCESS;
}

export interface IForgotPassError {
  readonly type: typeof constants.FORGOT_PASS_ERROR;
  readonly payload: TError;
}

export interface IResetPassRequest {
  readonly type: typeof constants.RESET_PASS_REQUEST;
}

export interface IResetPassSuccess {
  readonly type: typeof constants.RESET_PASS_SUCCESS;
}

export interface IResetPassError {
  readonly type: typeof constants.RESET_PASS_ERROR;
  readonly payload: TError;
}

export interface IProfileRequest {
  readonly type: typeof constants.PROFILE_REQUEST;
}

export interface IProfileSuccess {
  readonly type: typeof constants.PROFILE_SUCCESS;
  readonly payload: TUserPair;
}

export interface IProfileError {
  readonly type: typeof constants.PROFILE_ERROR;
  readonly payload: TError;
}

export interface IUpdateProfileRequest {
  readonly type: typeof constants.UPDATE_PROFILE_REQUEST;
}

export interface IUpdateProfileSuccess {
  readonly type: typeof constants.UPDATE_PROFILE_SUCCESS;
  readonly payload: Partial<TUserAuthStore>;
}

export interface IUpdateProfileError {
  readonly type: typeof constants.UPDATE_PROFILE_ERROR;
  readonly payload: TError;
}

export interface IRestoreUser {
  readonly type: typeof constants.RESTORE_USER;
  readonly payload: TUserAuthStats;
}

export type TAuthRequests =
  | IRegisterRequest
  | ILoginRequest
  | ILogoutRequest
  | IUpdateTokenRequest
  | IForgotPassRequest
  | IResetPassRequest
  | IProfileRequest
  | IUpdateProfileRequest;

export type TAuthSuccess =
  | IRegisterSuccess
  | ILoginSuccess
  | ILogoutSuccess
  | IUpdateTokenSuccess
  | IForgotPassSuccess
  | IResetPassSuccess
  | IProfileSuccess
  | IUpdateProfileSuccess
  | IRestoreUser;

export type TAuthError =
  | IRegisterError
  | ILoginError
  | ILogoutError
  | IUpdateTokenError
  | IForgotPassError
  | IResetPassError
  | IProfileError
  | IUpdateProfileError;

export type TAuthUserData =
  | IRegisterSuccess
  | ILoginSuccess
  | IUpdateTokenSuccess
  | IUpdateProfileSuccess;

type TFetchMethod = "POST" | "GET" | "PATH";
type TFetchBody = {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly token?: string;
};

const apiRequest: (
  endpoint: string,
  data: TFetchBody,
  method?: TFetchMethod
) => Promise<Response> = (endpoint, data, method) => {
  const requestOptions: RequestInit = {
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
  return fetch(API_URL + endpoint, requestOptions);
};

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      return Promise.reject("Неверный пароль!");
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  }
};

const setAuthData = (serverData: TServerData) => {
  const userData: TStorageUserData = (({ success, ...data }) => {
    return { ...data, isLogged: false };
  })({
    ...serverData,
  });
  setUserData(userData);
  const authData: TUserAuthStats = (({ refreshToken, ...data }) => data)({
    ...userData,
  });
  return authData;
};

function updateAllTokens(successCallback:Function, errorCallback:Function) {
  const refreshToken = getUserRefreshToken();
  apiRequest("/auth/token", { token: refreshToken })
    .then(checkResponse)
    .then((result) => {
      if (result.success) {
        successCallback(result.refreshToken, result.accessToken);
      } else {
        throw new Error("User Update Token JSON Error!");
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
}

const successUpdateTokens: (
  refreshToken: string,
  accessToken: string
) => void = (refreshToken, accessToken) => {
  updateUserRefreshToken(refreshToken);
  updateUserAccessToken(accessToken);
  store.dispatch({
    type: constants.UPDATE_TOKEN_SUCCESS,
    payload: { accessToken: accessToken },
  });
};

const errorUpdateTokens: (error: string) => void = (error) => {
  store.dispatch({
    type: constants.UPDATE_TOKEN_ERROR,
    payload: { source: "Update token", message: error },
  });
};

export function registerUser(user: string, email: string, password: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.REGISTER_REQUEST });
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
          const authData = setAuthData(result);
          dispatch({
            type: constants.REGISTER_SUCCESS,
            payload: authData,
          });
          setUserIsLogged(true);
        } else {
          throw new Error("User Register JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.REGISTER_ERROR,
          payload: { source: "New User Registration", message: error },
        });
      });
  };
}

export function loginUser(email: string, password: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.LOGIN_REQUEST });
    apiRequest("/auth/login", { email: email, password: password })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          const authData = setAuthData(result);
          dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: authData,
          });
          setUserIsLogged(true);
        } else {
          throw new Error("User Login JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.LOGIN_ERROR,
          payload: { source: "User Login", message: error },
        });
      });
  };
}

export function logoutUser() {
  const refreshToken = getUserRefreshToken();
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.LOGOUT_REQUEST });
    apiRequest("/auth/logout", { token: refreshToken })
      .then(checkResponse)
      .then(() => {
        dispatch({ type: constants.LOGOUT_SUCCESS });
        setUserIsLogged(false);
      })
      .catch((error) => {
        dispatch({
          type: constants.LOGOUT_ERROR,
          payload: { source: "User Logout", message: error },
        });
      });
  };
}

export function forgotPassword(email: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.FORGOT_PASS_REQUEST });
    apiRequest("/password-reset", { email: email })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          dispatch({
            type: constants.FORGOT_PASS_SUCCESS,
          });
        } else {
          throw new Error("Forgot Password JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.FORGOT_PASS_ERROR,
          payload: { source: "Forgot Password", message: error },
        });
      });
  };
}

export function resetPassword(email: string, password: string, token: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.RESET_PASS_REQUEST });
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
            type: constants.RESET_PASS_SUCCESS,
          });
          loginUser(email, password);
        } else {
          throw new Error("Reset Password JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.RESET_PASS_ERROR,
          payload: { source: "Reset Password", message: error },
        });
      });
  };
}

export function getProfile() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.PROFILE_REQUEST });
    const url = `${API_URL}/auth/user`;
    const options: RequestInit = {
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
          if (response.status === 403) {
            throw new Error("Token expired");
          } else {
            throw new Error(
              "Update user profile request: " + response.statusText
            );
          }
        }
      })
      .then((result) => {
        if (result.success) {
          const userProfile: TUserPair = result.user;
          dispatch({ type: constants.PROFILE_SUCCESS, payload: userProfile });
          setUserProfile(result.user);
        } else {
          throw new Error("User Profile JSON Error!");
        }
      })
      .catch((error) => {
        if (error.message === "Token expired") {
          dispatch({ type: constants.UPDATE_TOKEN_REQUEST });
          updateAllTokens(successUpdateTokens, errorUpdateTokens);
        } else {
          dispatch({
            type: constants.PROFILE_ERROR,
            payload: { source: "Get User Error", message: error.message },
          });
        }
      });
  };
}

export function setProfile(email: string, name: string, password: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.UPDATE_PROFILE_REQUEST });
    const url = `${API_URL}/auth/user`;
    const options: RequestInit = {
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
          const userProfile: TUserPair = result.user;
          dispatch({
            type: constants.UPDATE_PROFILE_SUCCESS,
            payload: userProfile,
          });
          setUserProfile(userProfile);
        } else {
          throw new Error("User Profile JSON Error!");
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.UPDATE_PROFILE_ERROR,
          payload: { source: "Set User Error", message: error.message },
        });
      });
  };
}

export function restoreUser(userData: TUserAuthStats) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.RESTORE_USER, payload: userData });
  };
}
