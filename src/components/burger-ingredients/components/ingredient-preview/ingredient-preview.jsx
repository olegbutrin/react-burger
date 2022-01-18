import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { PTIngredientData } from "../../../../utils/props";

import css from "./ingredient-preview.module.css";

// =================
// компонент для ингредиента в списке выбора
const IngredientPreview = (props) => {
  const location = useLocation();

  const prodID = props.productsData._id;
  const { bun, products } = useSelector((store) => store.burger);
  const count =
    props.productsData.type === "bun"
      ? bun && bun._id === prodID
        ? 2
        : 0
      : products.filter((ingr) => {
          return ingr._id === prodID;
        }).length;

  // делаем перетаскиватель
  const [, dragRef] = useDrag({
    type: "product",
    item: { ...props.productsData },
  });

  return (
    <Link key={prodID}
      to={{
        pathname: `/ingredients/${prodID}`,
        state: { background: location },
      }} className={css.routeLink}
    >
      <div className={css.ingrPreview} ref={dragRef}>
        {count > 0 && <Counter count={count} size={"default"} />}
        <img
          className={css.image + " mr-4 mb-1 ml-4"}
          src={props.productsData.image}
          alt={props.productsData.name}
        />
        <div className={css.price}>
          <p className="text text_type_digits-default">
            {props.productsData.price}
          </p>
          <div className={"ml-2"}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.name + " mt-1"}>
          <p className="text text_type_main-small">{props.productsData.name}</p>
        </div>
      </div>
    </Link>
  );
};

IngredientPreview.propTypes = {
  productsData: PTIngredientData.isRequired,
};

export default IngredientPreview;
