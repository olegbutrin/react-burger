
export const ingrTypeNames: IIngredientTypeName[] = ["bun", "sauce", "main"];

export type IIngredientTypeName = 'bun' | 'sauce' | 'main';

export interface IMenuItem {
  id: number,
  value: string,
  icon: string,
}

export interface IIngredientListType {
  value: string,
  max: number,
  type:IIngredientTypeName,
  unique: boolean,
  initial: boolean,
}

export interface IIngredientData {
  _id: string,
  name: string,
  type: IIngredientTypeName,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type IComponentTypeName = "top" | "bottom" | "center";

export enum ISelectedIngrActs {
  add = "add",
  remove = "remove",
  push = "push",
  clear = "clear"
}

export interface ISelectedIngrState {
  bun: IIngredientData | null,
  products: IIngredientData[],
}

export type ISelectedIngrAction =
  | { type: ISelectedIngrActs.add, product: IIngredientData }
  | { type: ISelectedIngrActs.remove, index: number }
  | { type: ISelectedIngrActs.push, products: IIngredientData[] }
  | { type: ISelectedIngrActs.clear }

