import { Dispatch } from "redux";
import { API_URL } from "../../utils/defaults";
import { TOrder, TOrderType } from "../../utils/types";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const CLEAR_ORDER_DATA: "CLEAR_ORDER_DATA" = "CLEAR_ORDER_DATA";

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrder;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IClearOrderData {
  readonly type: typeof CLEAR_ORDER_DATA;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IClearOrderData;

export function getOrder(products: string[]) {
  return function (dispatch: Dispatch) {
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
      .then((data:TOrderType) => {
        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}

export function clearOrder() {
  return function (dispatch: Dispatch) {
    dispatch({ type: CLEAR_ORDER_DATA });
  };
}
