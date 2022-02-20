import { IBurgerIngredientData } from "../../utils/types";

export const SET_BURGER_BUN: "SET_BURGER_BUN" = "SET_BURGER_BUN";
export const ADD_BURGER_PRODUCT: "ADD_BURGER_PRODUCT" = "ADD_BURGER_PRODUCT";
export const REMOVE_BURGER_PRODUCT: "REMOVE_BURGER_PRODUCT" =
  "REMOVE_BURGER_PRODUCT";
export const SWAP_BURGER_PRODUCTS: "SWAP_BURGER_PRODUCTS" =
  "SWAP_BURGER_PRODUCTS";
export const CLEAR_BURGER_PRODUCTS: "CLEAR_BURGER_PRODUCTS" =
  "CLEAR_BURGER_PRODUCTS";

export interface ISetBurgerBun {
  readonly type: typeof SET_BURGER_BUN;
  readonly payload: IBurgerIngredientData;
}

export interface IAddBurgerProduct {
  readonly type: typeof ADD_BURGER_PRODUCT;
  readonly payload: { item: IBurgerIngredientData; index: number };
}

export interface IRemoveBurgerProduct {
  readonly type: typeof REMOVE_BURGER_PRODUCT;
  readonly payload: IBurgerIngredientData;
}

export interface ISwapBurgerProducts {
  readonly type: typeof SWAP_BURGER_PRODUCTS;
  readonly payload: {
    source: IBurgerIngredientData;
    dest: IBurgerIngredientData;
  };
}

export interface IClearBurgerProducts {
  readonly type: typeof CLEAR_BURGER_PRODUCTS;
}

export type TBurgerActions =
  | ISetBurgerBun
  | IAddBurgerProduct
  | IRemoveBurgerProduct
  | ISwapBurgerProducts
  | IClearBurgerProducts;
