import { TIngredientListStore } from "../../utils/types";

import * as constants from "../constants/ingredient-list";

import { TGetIngredientsActions } from "../actions/ingredient-list";

export const initialState: TIngredientListStore = {
  ingredients: [],
  ingredientRequest: false,
  ingredientFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TGetIngredientsActions
) => {
  switch (action.type) {
    case constants.GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientRequest: true,
      };
    case constants.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        ingredientRequest: false,
        ingredientFailed: false,
      };
    case constants.GET_INGREDIENTS_FAILED:
      return {
        ...initialState,
        ingredientRequest: false,
        ingredientFailed: true,
      };
    default:
      return state;
  }
};
