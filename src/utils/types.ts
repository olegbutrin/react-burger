type IIngredientTypeName = "bun" | "sauce" | "main";

export interface IMenuItem {
  readonly id: number;
  readonly value: string;
  readonly icon: string;
  readonly route: string;
}

export interface IIngredientData {
  readonly _id: string;
  readonly name: string;
  readonly type: IIngredientTypeName;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export interface IIngredientListStore {
  ingredients: IIngredientData[];
  ingredientRequest: boolean;
  ingredientFailed: boolean;
}

export interface IUserAuthStore {
  readonly user: { readonly name: string; readonly email: string };
  readonly isLogged: boolean;
  readonly accessToken: string;
  readonly expired: number;
  readonly isForgot: boolean;
}

// Типизация для отдельного набора данных из store
// Логика: мы не знаем всех полей в глобальном хранилище,
// но знаем, что конкретное поле соответствует определенному типу.
// В результате при докомпозиции объекта store константы будут типизированы
export type TListStore = { [key: string]: any } & { list: IIngredientListStore };
export type TAuthStore = { [key: string]: any } & { auth: IUserAuthStore };

// Расширяем тип History для использования стейта и поля from
export type TCustomHystory = History & { from?: string};
