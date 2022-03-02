import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../../../utils/hooks";
import { useDrag } from "react-dnd";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./ingredient-preview.module.css";

import { IIngredientData } from "../../../../utils/types";

// =================
// компонент для ингредиента в списке выбора
const IngredientPreview: React.FC<{
  productsData: IIngredientData;
}> = ({ productsData }) => {
  const location = useLocation();

  const prodID = productsData._id;
  const { bun, products } = useSelector((store) => store.burger);
  const count =
    productsData.type === "bun"
      ? bun && bun._id === prodID
        ? 2
        : 0
      : products.filter((ingr) => {
          return ingr._id === prodID;
        }).length;

  // делаем перетаскиватель
  const [, dragRef] = useDrag({
    type: "product",
    item: { ...productsData },
  });

  return (
    <Link
      key={prodID}
      to={{
        pathname: `/ingredients/${prodID}`,
        state: { background: location },
      }}
      className={css.routeLink}
    >
      <div className={css.ingrPreview} ref={dragRef}>
        {count > 0 && <Counter count={count} size={"default"} />}
        <img
          className={css.image + " mr-4 mb-1 ml-4"}
          src={productsData.image}
          alt={productsData.name}
        />
        <div className={css.price}>
          <p className="text text_type_digits-default">{productsData.price}</p>
          <div className={"ml-2"}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.name + " mt-1"}>
          <p className="text text_type_main-small">{productsData.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default IngredientPreview;
