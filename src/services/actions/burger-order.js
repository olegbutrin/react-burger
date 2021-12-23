import { API_URL } from "../../utils/defaults";

export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const CLEAR_ORDER_DATA = "CLEAR_ORDER_DATA";

export function getOrder(products) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    fetch(API_URL + "/orders", {
      method: "POST",
      body: JSON.stringify({ ingredients: products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error order receive");
        }
      })
      .then((data) => {
        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
      })
      .catch((e) => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}

export function clearOrder() {
  return function (dispatch) {
    dispatch({ type: CLEAR_ORDER_DATA });
  };
}
