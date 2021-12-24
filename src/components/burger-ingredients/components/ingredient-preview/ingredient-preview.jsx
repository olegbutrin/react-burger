import React from "react";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { SET_ITEM_DATA } from "../../../../services/actions/ingredient-preview";

import { PTIngredientData } from "../../../../utils/props";

import css from "./ingredient-preview.module.css";

// =================
// компонент для ингредиента в списке выбора
const IngredientPreview = (props) => {
  const dispatch = useDispatch();

  const setCurrentData = () => {
    dispatch({ type: SET_ITEM_DATA, payload: { ...props.productsData } });
  };

  // делаем перетаскиватель
  const [, dragRef] = useDrag({
    type: "product",
    item: { ...props.productsData },
  });

  return (
    <div className={css.ingrPreview} onClick={setCurrentData} ref={dragRef}>
      {false && <Counter count={props.productsData.count} size={"default"} />}
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
  );
};

IngredientPreview.propTypes = {
  productsData: PTIngredientData.isRequired,
};

export default IngredientPreview;
