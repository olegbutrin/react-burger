
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

