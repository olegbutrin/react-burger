import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

// Данные
import mainMenu from "./utils/menu";
import productsData from "./utils/data";

const ingredientTypes = [
  { value: "Булки", type: "bun", max: 1, unique: true, initial: true },
  { value: "Соусы", type: "sauce", max: 3, unique: false, initial: false },
  { value: "Начинки", type: "main", max: 5, unique: false, initial: false },
];

ReactDOM.render(
  <React.StrictMode>
    <App
      productsData={productsData}
      menuData={mainMenu}
      ingredientTypes={ingredientTypes}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
