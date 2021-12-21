import React from "react";
import { IIngredientData } from "./types";
// При использовании typescript следует задавать тип начального значения
export const ConstructorContext = React.createContext<IIngredientData[]>([]);
