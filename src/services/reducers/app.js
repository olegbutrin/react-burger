import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/app";

import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
  REMOVE_BURGER_PRODUCT,
} from "../actions/ingredient-constructor";

const initialState = {
  ingredients: [],
  ingredientRequest: false,
  ingredientFailed: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientRequest: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.map((ingr) => {
          return { ...ingr, count: 0 };
        }),
        ingredientRequest: false,
        ingredientFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientRequest: false,
        ingredientFailed: true,
      };
    case SET_BURGER_BUN:
      return {
        ...state,
        ingredients: state.ingredients.map((ingr) => {
          if (ingr.type !== "bun") {
            return ingr;
          } else if (ingr._id === action.payload._id) {
            return {
              ...ingr,
              count: 2,
            };
          } else {
            return {
              ...ingr,
              count: 0,
            };
          }
        }),
      };
    case ADD_BURGER_PRODUCT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingr) => {
          return ingr._id === action.payload._id
            ? { ...ingr, count: ingr.count + 1 }
            : ingr;
        }),
      };
    case REMOVE_BURGER_PRODUCT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingr) => {
          return ingr._id === action.payload._id
            ? { ...ingr, count: ingr.count - 1 }
            : ingr;
        }),
      };
    default:
      return { ...state };
  }
};
