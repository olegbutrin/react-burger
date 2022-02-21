import { IBurgerIngredientData } from "../../utils/types";

import * as constants from "../constants/ingredient-constructor"

export interface ISetBurgerBun {
  readonly type: typeof constants.SET_BURGER_BUN;
  readonly payload: IBurgerIngredientData;
}

export interface IAddBurgerProduct {
  readonly type: typeof constants.ADD_BURGER_PRODUCT;
  readonly payload: { item: IBurgerIngredientData; index: number };
}

export interface IRemoveBurgerProduct {
  readonly type: typeof constants.REMOVE_BURGER_PRODUCT;
  readonly payload: IBurgerIngredientData;
}

export interface ISwapBurgerProducts {
  readonly type: typeof constants.SWAP_BURGER_PRODUCTS;
  readonly payload: {
    source: IBurgerIngredientData;
    dest: IBurgerIngredientData;
  };
}

export interface IClearBurgerProducts {
  readonly type: typeof constants.CLEAR_BURGER_PRODUCTS;
}

export type TBurgerActions =
  | ISetBurgerBun
  | IAddBurgerProduct
  | IRemoveBurgerProduct
  | ISwapBurgerProducts
  | IClearBurgerProducts;
