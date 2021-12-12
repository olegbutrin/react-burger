import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-order.module.css";

const BurgerOrder = (props: {
  summary: number;
  orderID: string;
  orderList: string[];
  doneCallback: (...args: any[]) => void;
}) => {
  return (
    <div className={css.orderContainer + " mt-10 mr-4"}>
      <div className={css.priceValue + " mr-10"}>
        <p className="text text_type_digits-medium mr-3">{props.summary}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        type="primary"
        size="medium"
        onClick={() => {
          props.doneCallback(props.summary, props.orderID, props.orderList);
        }}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

BurgerOrder.propTypes = {
  summary: PropTypes.number,
  orderID: PropTypes.string.isRequired,
  orderList: PropTypes.arrayOf(PropTypes.string).isRequired,
  doneCallback: PropTypes.func,
};

export default BurgerOrder;
