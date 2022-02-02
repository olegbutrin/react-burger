import { PUBLIC_APP } from "../../utils/defaults";

import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  FORGOT_PASS_SUCCESS,
  RESET_PASS_SUCCESS,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_TOKEN_ERROR,
  UPDATE_PROFILE_SUCCESS,
  RESTORE_USER,
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

// По определению, основные свойства состояния могут быть:
// аутенификация пройдена - состояние содержит актуальные данные статуса, токена и времени годности
// аутенификация провалена - состояние содержит исходные данные статуса, токена и времени годности

const authSuccess = (state, action) => {
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
const authError = (state) => {
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
const forgotState = (action) => {
  switch (action.type) {
    case FORGOT_PASS_SUCCESS:
      return true;
    default:
      return false;
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return authSuccess(state, action);
    case REGISTER_ERROR:
      return authError(state);
    case LOGIN_SUCCESS:
      return authSuccess(state, action);
    case LOGIN_ERROR:
      return authError(state);
    case LOGOUT_SUCCESS:
      return authError(state);
    case UPDATE_TOKEN_SUCCESS:
      return authSuccess(state, action);
    case UPDATE_TOKEN_ERROR:
      return authError(state);
    case UPDATE_PROFILE_SUCCESS:
      return authSuccess(state, action);
    case UPDATE_PROFILE_ERROR:
      return authError(state);
    case FORGOT_PASS_SUCCESS:
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        isForgot: forgotState(action),
      };
    case RESTORE_USER:
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
