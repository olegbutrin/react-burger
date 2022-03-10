import { Reducer } from "redux";

import * as constants from "../constants/ingredient-constructor";

import { TBurgerActions } from "../actions/ingredient-constructor";

import { TBurger } from "../../utils/types";

export const initialState: TBurger = {
  bun: null,
  products: [],
};

export const constructorReducer: Reducer<TBurger, TBurgerActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.SET_BURGER_BUN:
      return { ...state, bun: action.payload };
    case constants.ADD_BURGER_PRODUCT:
      return {
        ...state,
        products: [
          { ...action.payload.item, index: action.payload.index },
          ...state.products,
        ],
      };
    case constants.REMOVE_BURGER_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => {
          return prod.index !== action.payload.index;
        }),
      };
    case constants.SWAP_BURGER_PRODUCTS:
      const nextState = {
        ...state,
        products: state.products.map((prod) => {
          if (prod.index === action.payload.dest.index)
            return { ...action.payload.source };
          else if (prod.index === action.payload.source.index)
            return { ...action.payload.dest };
          else {
            return prod;
          }
        }),
      };
      return nextState;
    case constants.CLEAR_BURGER_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};
