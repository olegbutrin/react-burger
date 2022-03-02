import { IIngredientData } from "../../utils/types";

import * as constants from "../constants/ingredient-preview"

export interface ISetItemData {
  readonly type: typeof constants.SET_ITEM_DATA;
  readonly payload: IIngredientData;
}

export interface IClearItemData {
  readonly type: typeof constants.CLEAR_ITEM_DATA;
}

export type TItemPreviewActions = ISetItemData | IClearItemData;
