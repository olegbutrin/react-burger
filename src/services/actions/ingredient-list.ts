import { Dispatch } from "redux";
import { API_URL } from "../../utils/defaults";
import { IIngredientData } from "../../utils/types";

import * as constants from "../constants/ingredient-list";

export interface IGetIngredientsRequest {
  readonly type: typeof constants.GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof constants.GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredientData[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof constants.GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

// функция  для получения данных с сервера
export function getIngredients() {
  return async function (dispatch: Dispatch) {
    dispatch({ type: constants.GET_INGREDIENTS_REQUEST });
    await fetch(API_URL + "/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error data receive");
        }
      })
      .then((data) => {
        const ingredientData: IIngredientData[] = data.data;
        dispatch({ type: constants.GET_INGREDIENTS_SUCCESS, payload: ingredientData });
      })
      .catch(() => {
        dispatch({ type: constants.GET_INGREDIENTS_FAILED });
      });
  };
}
