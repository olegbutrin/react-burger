import React from "react";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData } from "../../../../utils/types";
import { PTIngredientData } from "../../../../utils/props";

import css from "./ingredient-preview.module.css";

// компонент для ингредиента в списке выбора
const IngredientPreview = (props: {
  previewCallback: (ingr: IIngredientData) => void;
  productsData: IIngredientData;
  count: number;
}) => {
  const showPreview = () => {
    props.previewCallback(props.productsData);
  };

  return (
    <div className={css.ingrPreview} onClick={showPreview}>
      {props.count > 0 && <Counter count={props.count} size={"default"} />}
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
  count: PropTypes.number.isRequired,
};

export default IngredientPreview;
