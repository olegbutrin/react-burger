// export enum IIngredientTypeName {
//   bun = "bun", sauce = "bun", main = "main" 
// }

export type IIngredientTypeName = 'bun' | 'sauce' | 'main'

export interface IMenuItem {
  id: number,
  value: string,
  icon: string,
}

export interface IIngredientListType {
  value: string,
  type: IIngredientTypeName,
  max: number,
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

export interface IIngredientSelectedList {
  [index: string | IIngredientTypeName]: string[];
}

export interface IOrderInfoProps {
  orderID: string;
}