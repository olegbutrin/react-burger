import { combineReducers } from "redux";
import { ingredientReducer } from "./burger-ingredients";

export const rootReducer = combineReducers({
  ingredient: ingredientReducer,
});
