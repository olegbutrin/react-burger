const storageKey = "_StellarBurgersUser_"

export const getUserData = () => {
  const localData = localStorage.getItem(storageKey);
  return localData ? JSON.parse(localData) : null;
}

export const setUserData = (data) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export const clearUserData = () => {
  localStorage.setItem(storageKey, "");
}

export const getUserName = () => {
  const data = getUserData();
  return data ? data.user.name : null; 
}

export const getUserEmail = () => {
  const data = getUserData();
  return data ? data.user.email : null; 
}

export const getUserAccessToken = () => {
  const data = getUserData();
  return data ? data.accessToken : null; 
}

export const getUserRefreshToken = () => {
  const data = getUserData();
  return data ? data.refreshToken : null; 
}