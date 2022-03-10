import * as constants from "../constants/ingredient-preview";

import { TItemPreviewActions } from "../actions/ingredient-preview";

import { IIngredientData } from "../../utils/types";

type TPreviewState = {
  productData: IIngredientData | null;
};

export const initialState: TPreviewState = {
  productData: null,
};

export const ingrPreviewReducer = (
  state = initialState,
  action: TItemPreviewActions
) => {
  switch (action.type) {
    case constants.SET_ITEM_DATA:
      return { ...state, productData: action.payload };
    case constants.CLEAR_ITEM_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
