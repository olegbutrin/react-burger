import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getOrder,
  clearOrder,
} from "../../../../services/actions/burger-order";

import Modal from "../../../modal/modal";
import ContentsOrder from "../../../modal-contents/modal-contents-order/modal-contents-order";
import ErrorInfo from "../../../modal-contents/modal-contents-error/modal-contents-error";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-order.module.css";

const BurgerOrder = () => {
  const dispatch = useDispatch();

  const { bunData, productsData } = useSelector((state) => ({
    bunData: state.burger.bun,
    productsData: state.burger.products,
  }));

  const { order, orderRequest, orderFailed } = useSelector(
    (store) => store.order
  );

  // расчет общей стоимости
  const summary = (() => {
    let res = productsData.reduce((sum, ingr) => sum + ingr.price, 0);
    if (bunData) {
      res += bunData.price * 2;
    }
    return res;
  })();

  const productsID = (() => {
    let prods = productsData.map((ingr) => {
      return ingr._id;
    });
    if (bunData) {
      prods.push(bunData._id);
    }
    return prods;
  })();

  const startOrder = () => {
    dispatch(getOrder(productsID));
  };

  const closeModal = () => {
    dispatch(clearOrder());
  };

  return (
    <div className={css.orderContainer + " mt-10 mr-4"}>
      <div className={css.priceValue + " mr-10"}>
        <p className="text text_type_digits-medium mr-3">{summary}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium" onClick={startOrder}>
        Оформить заказ
      </Button>
      {orderFailed && (
        <Modal closeCallback={closeModal}>
        <ErrorInfo/>
      </Modal>
      )}
      {!orderRequest && !orderFailed && order && (
        <Modal closeCallback={closeModal}>
          {/* провайдер контекста для модального окна заказа */}
          <ContentsOrder orderState={order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerOrder;
