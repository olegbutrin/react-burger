import { Dispatch } from "redux";
import { API_URL } from "../../utils/defaults";
import { IIngredientData } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredientData[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

// функция  для получения данных с сервера
export function getIngredients() {
  return function (dispatch: Dispatch) {
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
        const ingredientData: IIngredientData[] = data.data;
        dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: ingredientData });
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}
