import { PUBLIC_APP } from "../../utils/defaults";

import * as constants from "../constants/auth";

import { TAuthSuccess, TAuthError, TAuthUserData } from "../actions/auth";

import { TUserAuthStore } from "../../utils/types";

const initialState: TUserAuthStore = {
  user: {
    name: "",
    email: "",
  },
  isLogged: false,
  accessToken: "",
  expired: 0,
  isForgot: false,
};

// По определению, основные свойства состояния могут быть:
// аутенификация пройдена - состояние содержит актуальные данные статуса, токена и времени годности
// аутенификация провалена - состояние содержит исходные данные статуса, токена и времени годности

const authSuccess = (state: TUserAuthStore, action: TAuthUserData) => {
  return {
    ...state,
    isLogged: true,
    // при рефреше токена сревер не возвращает данные user
    // поэтому если их нет в payload, используем user из состояния
    user: action.payload.user ? action.payload.user : state.user,
    accessToken: action.payload.accessToken,
    expired: action.payload.expired,
  };
};

// Не менять параметры user во время выхода можно, если пользователь один или несколько
// Для приложения с публичным доступом затираем данные предыдущего пользователя,
// чтобы при входе в форму не попали данные из прошлой сессии
const authError = (state: TUserAuthStore) => {
  return {
    ...state,
    isLogged: false,
    user: PUBLIC_APP ? initialState.user : state.user,
    accessToken: initialState.accessToken,
    expired: initialState.expired,
  };
};

// isForgot определяет доступ к странице восстановления пароля
// и бывает только в двух значениях: true - если запрос на восстановление
// был обработан правильно или false - в любых других случаях (не послан, ошибка, тд)
const forgotState = (action: TAuthSuccess | TAuthError) => {
  switch (action.type) {
    case constants.FORGOT_PASS_SUCCESS:
      return true;
    default:
      return false;
  }
};

export const authReducer = (state = initialState, action: TAuthSuccess | TAuthError) => {
  switch (action.type) {
    case constants.REGISTER_SUCCESS:
      return authSuccess(state, action);
    case constants.REGISTER_ERROR:
      return authError(state);
    case constants.LOGIN_SUCCESS:
      return authSuccess(state, action);
    case constants.LOGIN_ERROR:
      return authError(state);
    case constants.LOGOUT_SUCCESS:
      return authError(state);
    case constants.UPDATE_TOKEN_SUCCESS:
      return authSuccess(state, action);
    case constants.UPDATE_TOKEN_ERROR:
      return authError(state);
    case constants.UPDATE_PROFILE_SUCCESS:
      return authSuccess(state, action);
    case constants.UPDATE_PROFILE_ERROR:
      return authError(state);
    case constants.FORGOT_PASS_SUCCESS:
    case constants.RESET_PASS_SUCCESS:
      return {
        ...state,
        isForgot: forgotState(action),
      };
    case constants.RESTORE_USER:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        expired: action.payload.expired,
      };
    default:
      return state;
  }
};
