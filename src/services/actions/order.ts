import { Dispatch } from "redux";

import { API_URL } from "../../utils/defaults";
import { TError, TFeedOrder, TOrderServerMessage } from "../../utils/types";

import * as constants from "../constants/order";

export interface IOrderDetailsRequest {
  readonly type: typeof constants.ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccess {
  readonly type: typeof constants.ORDER_DETAILS_SUCCESS;
  readonly payload: TFeedOrder;
}

export interface IOrderDetailsError {
  readonly type: typeof constants.ORDER_DETAILS_ERROR;
  readonly payload: TError;
}

export type TOrderDetails =
  | IOrderDetailsRequest
  | IOrderDetailsSuccess
  | IOrderDetailsError;
export type TOrderError = IOrderDetailsError;

export const fetchOrderInfo = (orderID: string) => {
  return async function (dispatch: Dispatch) {
    const requestOptions: RequestInit = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    const requestURL: string = API_URL + "/orders/" + orderID;
    dispatch({ type: constants.ORDER_DETAILS_REQUEST });
    await fetch(requestURL, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Get order error: " + response.statusText);
        }
      })
      .then((result: TOrderServerMessage) => {
        if (result.success) {
          dispatch({
            type: constants.ORDER_DETAILS_SUCCESS,
            payload: result.orders[0],
          });
        } else {
          throw new Error("Error parse order request response");
        }
      })
      .catch((error: Error) => {
        dispatch({
          type: constants.ORDER_DETAILS_ERROR,
          payload: { source: "Order Details", message: error.message },
        });
      });
  };
};
