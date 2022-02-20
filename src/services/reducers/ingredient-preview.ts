import {
  SET_ITEM_DATA,
  CLEAR_ITEM_DATA,
  TItemPreviewActions,
} from "../actions/ingredient-preview";

import { IIngredientData } from "../../utils/types";

type TPreviewState = {
  productData: IIngredientData | null;
};

const initialState: TPreviewState = {
  productData: null,
};

export const ingrPreviewReducer = (
  state = initialState,
  action: TItemPreviewActions
) => {
  switch (action.type) {
    case SET_ITEM_DATA:
      return { ...state, productData: action.payload };
    case CLEAR_ITEM_DATA:
      return { ...initialState };
    default:
      return state;
  }
};
