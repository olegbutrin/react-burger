import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredient-list";
import { ingrPreviewReducer } from "./ingredient-preview";
import { constructorReducer } from "./ingredient-constructor";
import { orderReducer } from "./burger-order";

export const rootReducer = combineReducers({
  list: ingredientsReducer,
  preview: ingrPreviewReducer,
  burger: constructorReducer,
  order: orderReducer,
});
