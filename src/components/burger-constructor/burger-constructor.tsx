import React from "react";

import BurgerContentsItem from "./components/burger-contents-item/burger-contents-item";
import BurgerOrder from "./components/burger-order/burger-order";

import { IIngredientData } from "../../utils/types";

import css from "./burger-constructor.module.css";

import { ConstructorContext } from "../../utils/constructorContext";

// Основной класс конструктора бургеров

//Поскольку список продуктов передается через контекст, props не используются

const BurgerConstructor = () => {
  const productsContext = React.useContext(ConstructorContext);

  const { bun, products } = productsContext.selectedIngredients;

  return (
    <div className={css.main + " mt-25"}>
      {/* верхняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_TOP", bun._id].join("_")}
          data={bun}
          type="top"
          index={-1}
        />
      )}
      <div className={css.container + " custom-scroll"}>
        {products.map((ingr: IIngredientData, index: number) => {
          // поскольку фильтрация перенесена в редюсер selectedIngredients, обойдемся без проверки на тип
          return (
            <BurgerContentsItem
              key={["BurgIngr", ingr._id, index].join("_")}
              data={ingr}
              type={"center"}
              index={index}
            />
          );
        })}
      </div>
      {/* нижняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_BOTTOM", bun._id].join("_")}
          data={bun}
          type="bottom"
          index={-1}
        />
      )}
      <BurgerOrder productsData={products}></BurgerOrder>
    </div>
  );
};

export default BurgerConstructor;
