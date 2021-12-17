import React from "react";
// При использовании typescript следует задавать тип начального значения
export const OrderContext = React.createContext<{
  name: string;
  order: { number: number | string };
  success: boolean;
}>({
  name: "",
  order: { number: "****" },
  success: false,
});
