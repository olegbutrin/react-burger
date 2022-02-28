import { useSelector } from "../utils/hooks";

import { TStorageUserData, TUserPair, TUserAuthStats } from "../utils/types";

const storageKey: string = "_StellarBurgersUser_";

export const getUserData: () => TStorageUserData | null = () => {
  const localData = localStorage.getItem(storageKey);
  return localData ? JSON.parse(localData) : null;
};

export const setUserData: (data: TStorageUserData) => void = (data) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearUserData: () => void = () => {
  localStorage.setItem(storageKey, "");
};

export const setUserIsLogged: (isLogged: boolean) => void = (isLogged) => {
  const data = getUserData();
  if (data !== null) {
    setUserData({ ...data, isLogged: isLogged });
  }
};

export const getUserProfile: () => TUserPair = () => {
  const data = getUserData();
  return data && data.user ? data.user : { email: "", name: "" };
};

export const setUserProfile: (user: TUserPair) => void = (user) => {
  const data = getUserData();
  if (data != null) {
    setUserData({ ...data, user: user });
  }
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

export const updateUserAccessToken: (accessToken: string) => void = (
  accessToken
) => {
  const data = getUserData();
  data && setUserData({ ...data, accessToken: accessToken });
};

export const getLocalStorageAuth: () => TUserAuthStats | null = () => {
  const data = getUserData();
  if (data !== null) {
    return {
      isLogged: !!data.isLogged,
      user: data.user,
      accessToken: data.accessToken,
    };
  } else {
    return null;
  }
};

// хук для получения статуса пользователя на конкретный момент
export const useUserStatus: () => { isAuthenticated: boolean } = () => {
  const { isLogged } = useSelector((store) => store.auth);
  const isAuthenticated: boolean = isLogged;
  return { isAuthenticated: isAuthenticated };
};
