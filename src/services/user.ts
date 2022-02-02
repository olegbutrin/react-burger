import { useSelector } from "react-redux";

import { TStorageUserData, TUserPair, TAuthStore, TUserAuthStats } from "../utils/types";
// Используем тип UserData с необязательными полями потому,
// что не localStrorage не всегда содержит данные пользователя
type TUserData = Partial<TStorageUserData>;

const storageKey: string = "_StellarBurgersUser_";

export const getUserData: () => TUserData = () => {
  const localData = localStorage.getItem(storageKey);
  return localData ? JSON.parse(localData) : null;
};

export const setUserData: (data: TUserData) => void = (data) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearUserData: () => void = () => {
  localStorage.setItem(storageKey, "");
};

export const setUserIsLogged: (isLogged: boolean) => void = (isLogged) => {
  const data = getUserData();
  setUserData({ ...data, isLogged: isLogged });
};

export const getUserProfile: () => TUserPair = () => {
  const data = getUserData();
  return data && data.user ? data.user : { email: "", name: "" };
};

export const setUserProfile: (user: TUserPair) => void = (user) => {
  const data = getUserData();
  setUserData({ ...data, user: user });
};

export const getUserName: () => string = () => {
  const data = getUserData();
  return data && data.user && data.user.name ? data.user.name : "";
};

export const getUserEmail: () => string = () => {
  const data = getUserData();
  return data && data.user && data.user.email ? data.user.email : "";
};

export const getUserRefreshToken: () => string = () => {
  const data = getUserData();
  return data && data.refreshToken ? data.refreshToken : "";
};

export const updateUserRefreshToken: (refreshToken: string) => void = (
  refreshToken
) => {
  const data = getUserData();
  data && setUserData({ ...data, refreshToken: refreshToken });
};

export const getUserAccessToken: () => string = () => {
  const data = getUserData();
  return data && data.accessToken ? data.accessToken : "";
};

export const getUserExpired: () => number = () => {
  const data = getUserData();
  return data && data.expired ? data.expired : 0;
};

export const getLocalStorageAuth: () => Partial<TUserAuthStats> = () => {
  const timeNow = new Date().getTime();
  const data = getUserData();
  return {
    isLogged: !!(data.isLogged && data.expired && timeNow < data.expired),
    user: data.user,
    accessToken: data.accessToken,
    expired: data.expired,
  };
};

// хук для получения статуса пользователя на конкретный момент
export const useUserStatus: () => { isAuthenticated: boolean } = () => {
  const timeNow: number = new Date().getTime();
  const { isLogged, expired } = useSelector((store: TAuthStore) => store.auth);
  const isAuthenticated: boolean = isLogged && timeNow < expired;

  return { isAuthenticated: isAuthenticated };
};
