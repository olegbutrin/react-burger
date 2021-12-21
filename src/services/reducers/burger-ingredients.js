import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  ingredientRequest: false,
  ingredientFailed: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        ingredientRequest: false,
        ingredientFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: true,
      };
  }
};
