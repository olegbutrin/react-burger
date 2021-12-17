import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";

import { IIngredientData } from "../../utils/types";

import css from "./burger-ingredients.module.css";

import { ConstructorContext } from "../../utils/constructorContext";

/*
Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка.

*/

const BurgerIngredients = () => {
  //
  const productsData = React.useContext(ConstructorContext);
  const [activeType, setActiveType] = React.useState("bun");

  const tabClick = (type: string) => {
    setActiveType(type);
  };

  const buns = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "bun";
  });
  const sauces = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "sauce";
  });
  const mains = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "main";
  });

  return (
    <div className={css.main}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={css.menu + " mb-10"}>
        <Tab
          key={"TAB_BUN"}
          value="bun"
          active={activeType === "bun"}
          onClick={tabClick}
        >
          Булки
        </Tab>
        <Tab
          key={"TAB_SOUCE"}
          value="souce"
          active={activeType === "souce"}
          onClick={tabClick}
        >
          Соусы
        </Tab>
        <Tab
          key={"TAB_MAIN"}
          value="main"
          active={activeType === "main"}
          onClick={tabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={css.container + " custom-scroll"}>
        <IngredientBox
          key={"BOX_BUN"}
          value="Булки"
          type="bun"
          productsData={buns}
        ></IngredientBox>
        <IngredientBox
          key={"BOX_SAUCE"}
          value="Соусы"
          type="sauce"
          productsData={sauces}
        ></IngredientBox>
        <IngredientBox
          key={"BOX_MAIN"}
          value="Начинки"
          type="main"
          productsData={mains}
        ></IngredientBox>
      </div>
    </div>
  );
};

export default BurgerIngredients;
