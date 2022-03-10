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
  | IForgotPassRequest
  | IResetPassRequest
  | IProfileRequest
  | IUpdateProfileRequest;

export type TAuthSuccess =
  | IRegisterSuccess
  | ILoginSuccess
  | ILogoutSuccess
  | IForgotPassSuccess
  | IResetPassSuccess
  | IProfileSuccess
  | IUpdateProfileSuccess
  | IRestoreUser;

export type TAuthError =
  | IRegisterError
  | ILoginError
  | ILogoutError
  | IForgotPassError
  | IResetPassError
  | IProfileError
  | IUpdateProfileError;

export type TAuthUserData =
  | IRegisterSuccess
  | ILoginSuccess
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

const apiSecureRequest: (
  endpoint: string,
  auth: string,
  method?: TFetchMethod
) => Promise<Response> = (endpoint, auth, method) => {
  const requestOptions: RequestInit = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  return fetch(API_URL + endpoint, requestOptions);
};

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      return Promise.reject(new Error("Неверный пароль!"));
    } else if (response.status === 403) {
      return Promise.reject(new Error("Токен просрочен или недействителен!"));
    } else {
      return Promise.reject(new Error(`Ошибка ${response.status}`));
    }
  }
};

const isTokenIssue: (error: Error) => boolean = (error) => {
  return (
    error.message === "Неверный пароль!" ||
    error.message === "Токен просрочен или недействителен!"
  );
};

const setAuthData = (serverData: TServerData) => {
  const userData: TStorageUserData = (({ success, ...data }) => {
    return { ...data, isLogged: false };
  })({
    ...serverData,
  });
  setUserData(userData);
  const authData: TUserAuthStats = (({ refreshToken, accessToken, ...data }) =>
    data)({
    ...userData,
  });
  return authData;
};

export const updateTokens = async () => {
  const refreshToken = getUserRefreshToken();
  return apiRequest("/auth/token", { token: refreshToken })
    .then(checkResponse)
    .then((result) => {
      if (result.success) {
        updateUserRefreshToken(result.refreshToken);
        updateUserAccessToken(result.accessToken);
        return true;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
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
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          const authData = setAuthData(result);
          dispatch({
            type: constants.REGISTER_SUCCESS,
            payload: authData,
          });
          setUserIsLogged(true);
        } else {
          return Promise.reject(new Error("User Register JSON Error!"));
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.REGISTER_ERROR,
          payload: { source: "New User Registration", message: error.message },
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
          return Promise.reject(new Error("User Login Error!"));
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.LOGIN_ERROR,
          payload: { source: "User Login", message: error.message },
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
          payload: { source: "User Logout", message: error.message },
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
          return Promise.reject(new Error("Forgot Password JSON Error!"));
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.FORGOT_PASS_ERROR,
          payload: { source: "Forgot Password", message: error.message },
        });
      });
  };
}

export function resetPassword(email: string, password: string, token: string) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.RESET_PASS_REQUEST });
    apiRequest("/password-reset", { password: password, token: token })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          dispatch({
            type: constants.RESET_PASS_SUCCESS,
          });
          loginUser(email, password);
        } else {
          return Promise.reject(new Error("Reset Password JSON Error!"));
        }
      })
      .catch((error) => {
        dispatch({
          type: constants.RESET_PASS_ERROR,
          payload: { source: "Reset Password", message: error.message },
        });
      });
  };
}

export function getProfile() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.PROFILE_REQUEST });
    apiSecureRequest("/auth/user", getUserAccessToken(), "GET")
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          const userProfile: TUserPair = result.user;
          dispatch({ type: constants.PROFILE_SUCCESS, payload: userProfile });
          setUserProfile(result.user);
        } else {
          return Promise.reject(new Error("User Profile JSON Error!"));
        }
      })
      .catch((error: Error) => {
        const tokenIssue = isTokenIssue(error);
        if (tokenIssue) {
          updateTokens().then((result) => {
            if (result) {
              getProfile();
            } else {
              dispatch({
                type: constants.PROFILE_ERROR,
                payload: { source: "Get User Error", message: error.message },
              });
            }
          });
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
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          const userProfile: TUserPair = result.user;
          dispatch({
            type: constants.UPDATE_PROFILE_SUCCESS,
            payload: userProfile,
          });
          setUserProfile(userProfile);
        } else {
          return Promise.reject(new Error("User Profile JSON Error!"));
        }
      })
      .catch((error) => {
        const tokenIssue = isTokenIssue(error);
        if (tokenIssue) {
          updateTokens().then((result) => {
            if (result) {
              getProfile();
            } else {
              dispatch({
                type: constants.UPDATE_PROFILE_ERROR,
                payload: { source: "Set User Error", message: error.message },
              });
            }
          });
        } else {
          dispatch({
            type: constants.UPDATE_PROFILE_ERROR,
            payload: { source: "Set User Error", message: error.message },
          });
        }
      });
  };
}

export function restoreUser(userData: TUserAuthStats) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.RESTORE_USER, payload: userData });
  };
}
