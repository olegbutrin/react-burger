import { API_URL } from "../../utils/defaults";

export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

// функция  для получения данных с сервера
export function getRawIngredients() {
  return function (dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(API_URL + "/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error data receive");
        }
      })
      .then((data) => {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
      })
      .catch((e) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}
