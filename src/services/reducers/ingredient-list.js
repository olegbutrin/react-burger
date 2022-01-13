import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredient-list";

const initialState = {
  ingredients: [],
  ingredientRequest: false,
  ingredientFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        ingredientRequest: false,
        ingredientFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...initialState,
        ingredientFailed: true,
      };
    default:
      return { ...state };
  }
};
