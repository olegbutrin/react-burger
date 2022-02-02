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

export type TIngredientListStore = {
  ingredients: IIngredientData[];
  ingredientRequest: boolean;
  ingredientFailed: boolean;
};

export type TUserPair = { readonly name: string; readonly email: string };

export type TUserAuthStore = {
  readonly user: TUserPair;
  readonly isLogged: boolean;
  readonly accessToken: string;
  readonly expired: number;
  readonly isForgot: boolean;
};

export type TStorageUserData = Omit<TUserAuthStore, "isForgot"> & {
  readonly refreshToken: string;
};

// Типизация для отдельного набора данных из store
// Логика: мы не знаем всех полей в глобальном хранилище,
// но знаем, что конкретное поле соответствует определенному типу.
// В результате при декомпозиции объекта store константы будут типизированы
export type TListStore = { [key: string]: any } & {
  list: TIngredientListStore;
};
export type TAuthStore = { [key: string]: any } & { auth: TUserAuthStore };

// Расширяем тип History для использования стейта и поля from
export type TCustomHystory = History & { from?: string };
