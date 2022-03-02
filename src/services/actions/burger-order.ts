import { Dispatch } from "redux";
import { API_URL } from "../../utils/defaults";
import { TOrderType } from "../../utils/types";

import { getUserAccessToken } from "../user";

import * as constants from "../constants/burger-order";

export interface IGetOrderRequest {
  readonly type: typeof constants.GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof constants.GET_ORDER_SUCCESS;
  readonly payload: TOrderType;
}

export interface IGetOrderFailed {
  readonly type: typeof constants.GET_ORDER_FAILED;
}

export interface IClearOrderData {
  readonly type: typeof constants.CLEAR_ORDER_DATA;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IClearOrderData;

export function getOrder(products: string[]) {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.GET_ORDER_REQUEST });
    fetch(API_URL + "/orders", {
      method: "POST",
      body: JSON.stringify({ ingredients: products }),
      headers: {
        "Content-Type": "application/json",
        'Authorization': getUserAccessToken(),
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
        const orderData: TOrderType = data;
        dispatch({ type: constants.GET_ORDER_SUCCESS, payload: orderData });
      })
      .catch(() => {
        dispatch({ type: constants.GET_ORDER_FAILED });
      });
  };
}

export function clearOrder() {
  return function (dispatch: Dispatch) {
    dispatch({ type: constants.CLEAR_ORDER_DATA });
  };
}
