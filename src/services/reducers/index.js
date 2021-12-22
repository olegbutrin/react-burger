import { combineReducers } from "redux";
import { appReducer } from "./app";
import { ingrPreviewReducer } from "./ingredient-preview";
import { constructorReducer } from "./ingredient-constructor";

export const rootReducer = combineReducers({
  app: appReducer,
  preview: ingrPreviewReducer,
  burger: constructorReducer,
});
