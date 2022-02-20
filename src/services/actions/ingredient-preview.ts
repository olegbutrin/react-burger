import { IIngredientData } from "../../utils/types";

export const SET_ITEM_DATA: "SET_ITEM_DATA" = "SET_ITEM_DATA";
export const CLEAR_ITEM_DATA: "CLEAR_ITEM_DATA" = "CLEAR_ITEM_DATA";

export interface ISetItemData {
  readonly type: typeof SET_ITEM_DATA;
  readonly payload: IIngredientData;
}

export interface IClearItemData {
  readonly type: typeof CLEAR_ITEM_DATA;
}

export type TItemPreviewActions = ISetItemData | IClearItemData;
