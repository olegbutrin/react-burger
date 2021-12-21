import { combineReducers } from "redux";
import { rawReducer } from "./app";

export const rootReducer = combineReducers({
  raw: rawReducer,
});
