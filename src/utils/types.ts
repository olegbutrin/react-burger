import { ReactNode, ReactElement } from "react";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";

import { rootReducer } from "../services/reducers";

import {
  TAuthRequests,
  TAuthSuccess,
  TAuthError,
} from "../services/actions/auth";
import { TOrderActions } from "../services/actions/burger-order";
import { IClearError } from "../services/actions/error";
import { TBurgerActions } from "../services/actions/ingredient-constructor";
import { TGetIngredientsActions } from "../services/actions/ingredient-list";
import { TItemPreviewActions } from "../services/actions/ingredient-preview";
import { TWSActions } from "../services/actions/websocket";
import { TFeedActions } from "../services/actions/feed";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
} from "../services/constants/websocket";

import {
  FEED_FETCH_ORDER,
  FEED_RECEIVE_ORDERS,
} from "../services/constants/feed";

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

// Общий тип данных приходящих при работе с учеткой пользователя
export type TServerData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUserPair;
};

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

export type TBurger = {
  bun: IIngredientData | null;
  products: Array<IBurgerIngredientData>;
};

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

export type TError = {
  source: string;
  message: string;
};

export type TWebsocketState = {
  connected: boolean;
  messages: string[];
};

// FEED
export type TFeedType = "all" | "user";

export enum FeedStatus {
  DONE = "done",
  CREATED = "created",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export type TFeedOrder = {
  _id: string;
  number: number;
  ingredients: ReadonlyArray<string>;
  createdAt: string;
  updatedAt: string;
  status: FeedStatus;
  name: string;
};

export type TFeedFeed = {
  feed: {
    orders: ReadonlyArray<TFeedOrder>,
  }
}

export type TFeedServerMessage = {
  orders: ReadonlyArray<TFeedOrder>;
  total: number;
  totalToday: number;
  success: boolean;
}

export type TFeedStore = {
  type: TFeedType;
  orders: ReadonlyArray<TFeedOrder>;
  total: number;
  totalToday: number;
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

// ACTIONS and REDUCERS

// В качестве RootState берем возвращаемый тип основного редюсера
export type RootState = ReturnType<typeof rootReducer>;

// Собираем все доступные экшены в один тип
export type TApplicationActions =
  | TAuthRequests
  | TAuthSuccess
  | TAuthError
  | TOrderActions
  | IClearError
  | TBurgerActions
  | TGetIngredientsActions
  | TItemPreviewActions
  | TWSActions
  | TFeedActions;

// Определяем Thunk
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Определяем тип диспетчера через дженерик из редакс и экшены
export type AppDispatch = Dispatch<TApplicationActions>;

//
export type TWSMiddlewareActions = {
  readonly onInit: typeof WS_CONNECTION_START;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onClose: typeof WS_CLOSE;
  readonly onClosed: typeof WS_CONNECTION_CLOSED;
  readonly onSend: typeof WS_SEND_MESSAGE;
  readonly onOpen: typeof FEED_FETCH_ORDER;
  readonly onMessage: typeof FEED_RECEIVE_ORDERS;
};
