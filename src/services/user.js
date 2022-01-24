import { useSelector } from "react-redux";

const storageKey = "_StellarBurgersUser_";

export const getUserData = () => {
  const localData = localStorage.getItem(storageKey);
  return localData ? JSON.parse(localData) : null;
};

export const setUserData = (data) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearUserData = () => {
  localStorage.setItem(storageKey, "");
};

export const getUserProfile = () => {
  const data = getUserData();
  return data && data.user ? data.user : { email: "", name: "" };
};

export const setUserProfile = (user) => {
  const data = getUserData();
  setUserData({...data, user:user})
}

export const getUserName = () => {
  const data = getUserData();
  return data && data.user && data.user.name ? data.user.name : "";
};

export const getUserEmail = () => {
  const data = getUserData();
  return data && data.user && data.user.email ? data.user.email : "";
};

export const getUserRefreshToken = () => {
  const data = getUserData();
  return data && data.refreshToken ? data.refreshToken : "";
};

export const updateUserRefreshToken = (refreshToken) => {
  const data = getUserData();
  data && setUserData({ ...data, refreshToken: refreshToken });
};

export const getUserAccessToken = () => {
  const data = getUserData();
  return data && data.accessToken ? data.accessToken : "";
}

// хук для получения статуса пользователя на конкретный момент
export const useUserStatus = () => {
  const timeNow = new Date().getTime();
  const { isLogged, expired } = useSelector((store) => store.auth);
  const isAuthenticated = isLogged && timeNow < expired;

  return { isAuthenticated: isAuthenticated };
};
