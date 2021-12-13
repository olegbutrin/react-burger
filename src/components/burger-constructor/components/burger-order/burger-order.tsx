import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData } from "../../../../utils/types";
import { PTIngredientData } from "../../../../utils/props";

import css from "./burger-order.module.css";

const BurgerOrder = (props: {
  productsData: IIngredientData[];
  doneCallback: (...args: any[]) => void;
}) => {
  const summary = props.productsData.reduce(
    (sum, { price }: { price: number }) => sum + price,
    0
  );

  const orderID = (() => {
    const chars = "0123456789";
    const len = Math.ceil(Math.random() * 4) + 2;
    let id = "";
    while (id.length < len) {
      id += chars[Math.floor(Math.random() * 10)];
    }
    return id;
  })();

  const doneFn = () => {
    props.doneCallback(summary, orderID, props.productsData);
  };

  return (
    <div className={css.orderContainer + " mt-10 mr-4"}>
      <div className={css.priceValue + " mr-10"}>
        <p className="text text_type_digits-medium mr-3">{summary}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium" onClick={doneFn}>
        Оформить заказ
      </Button>
    </div>
  );
};

BurgerOrder.propTypes = {
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  doneCallback: PropTypes.func,
};

export default BurgerOrder;
