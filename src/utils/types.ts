import { ReactNode, ReactElement } from "react";

export type IIngredientTypeName = "bun" | "sauce" | "main";

export interface IMenuItem {
  readonly id: number;
  readonly value: string;
  readonly active?: boolean;
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

export interface IBurgerIngredientData extends IIngredientData {
  index?: string;
}

export type TIngredientListStore = {
  ingredients: IIngredientData[];
  ingredientRequest: boolean;
  ingredientFailed: boolean;
};

// Пара данных пользователь-емайл
export type TUserPair = { readonly name: string; readonly email: string };

// Тип для хранилища auth
export type TUserAuthStore = {
  readonly user: TUserPair;
  readonly isLogged: boolean;
  readonly accessToken: string;
  readonly expired: number;
  readonly isForgot: boolean;
};

// Тип для набора данных для определения текущего статуса пользователя
// То же самое, что в хранилище, минус временный статус isForgot
export type TUserAuthStats = Omit<TUserAuthStore, "isForgot">;

// Тип для хранения пользовательских данных в localStorage
// То же самое, что и для статуса, плюс токен обновления
export type TStorageUserData = TUserAuthStats & {
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

export type TBurger = {
  bun: IIngredientData | null;
  products: Array<IBurgerIngredientData>;
};

export type TBurgerStore = { [key: string]: any } & { burger: TBurger };

export type TOrderType = {
  name: string;
  order: {
    number: string | number;
  };
  success: boolean;
};

export type TOrder = {
  order: TOrderType | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

export type TOrderStore = { [key: string]: any } & { order: TOrder };

export type TErrorStore = { [key: string]: any } & {
  error: { source: string; message: string };
};

// Расширяем тип History для использования стейта и поля from
export type TCustomHystory = History & { from?: string };

export type TCustomLocation = {
  background?: string;
};

export type TProtectedRoute = {
  children: ReactNode;
  path: string;
  exact?: boolean;
};

export type TModalOverlayType = {
  children?: ReactElement;
  closeCallback: (e: React.UIEvent<HTMLElement>) => void;
};

export type TModalWindowType = {
  children: ReactNode;
  header?: string;
  closeCallback: () => void;
};
