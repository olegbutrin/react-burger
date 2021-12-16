import React from "react";
import { ISelectedIngrAction, ISelectedIngrState } from "./types";

const selectedIngrDef: ISelectedIngrState = { bun: null, products: [] };

// При использовании typescript следует задавать тип начального значения

export const ConstructorContext = React.createContext<{
  selectedIngredients: ISelectedIngrState;
  selectedIngredientsDispatcher: React.Dispatch<ISelectedIngrAction>;
}>({
  selectedIngredients: selectedIngrDef,
  selectedIngredientsDispatcher: () => null,
});
