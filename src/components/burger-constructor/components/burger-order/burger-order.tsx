import React, { SyntheticEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../../../utils/hooks";
import { useHistory } from "react-router-dom";

import { useUserStatus } from "../../../../services/user";

import {
  getOrder,
  clearOrder,
} from "../../../../services/actions/burger-order";

import { CLEAR_BURGER_PRODUCTS } from "../../../../services/constants/ingredient-constructor";

import Modal from "../../../modal/modal";
import OrderDetails from "../../../order-details/order-details";
import { OrderWaiting } from "../../../order-waiting/order-waiting";
import ErrorInfo from "../../../order-error/order-error";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-order.module.css";
import { updateTokens } from "../../../../services/actions/auth";
import { LOGOUT_SUCCESS } from "../../../../services/constants/auth";

// выносим кнопку запроса заказа в отдельный компонент потому,
// что нужно использовать хук проверки статуса пользователя
// непосредственно в момент нажатия, а не рендера родителя
const OrderButton: React.FC<{ productsID: string[]; isRequest: boolean }> = ({
  productsID,
  isRequest,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated } = useUserStatus();
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    if (isRequest) {
      return;
    }
    if (btnClicked) {
      setBtnClicked(false);
      if (isAuthenticated) {
        updateTokens().then((result) => {
          if (result) {
            dispatch(getOrder(productsID));
          } else {
            dispatch({ type: LOGOUT_SUCCESS });
            history.push({
              pathname: "/login",
              state: { from: history.location.pathname },
            });
          }
        });
      } else {
        history.push({
          pathname: "/login",
          state: { from: history.location.pathname },
        });
      }
    }
  }, [
    btnClicked,
    isAuthenticated,
    isRequest,
    history,
    dispatch,
    productsID,
  ]);

  const callback = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setBtnClicked(true);
  };

  return (
    <Button type="primary" size="medium" onClick={callback}>
      {isAuthenticated ? "Оформить заказ" : "Войти и заказать"}
    </Button>
  );
};

// Основной компонент
const BurgerOrder = () => {
  const dispatch = useDispatch();

  const { bunData, productsData } = useSelector((store) => ({
    bunData: store.burger.bun,
    productsData: store.burger.products,
  }));

  const { order, orderRequest, orderFailed } = useSelector(
    (store) => store.order
  );

  // расчет общей стоимости
  const summary = React.useMemo(() => {
    let res = productsData.reduce((sum, ingr) => sum + ingr.price, 0);
    if (bunData) {
      res += bunData.price * 2;
    }
    return res;
  }, [bunData, productsData]);

  const productsID = (() => {
    let prods = productsData.map((ingr) => {
      return ingr._id;
    });
    if (bunData) {
      prods.push(bunData._id);
    }
    return prods;
  })();

  const closeModal = () => {
    dispatch(clearOrder());
  };

  const closeModalClearBurger = () => {
    dispatch(clearOrder());
    dispatch({ type: CLEAR_BURGER_PRODUCTS });
  };

  return (
    <div className={css.orderContainer + " mt-10 mr-4"}>
      <div className={css.priceValue + " mr-10"}>
        <p className="text text_type_digits-medium mr-3">{summary}</p>
        <CurrencyIcon type="primary" />
      </div>
      <OrderButton
        productsID={productsID}
        isRequest={orderRequest}
      ></OrderButton>
      {orderFailed && (
        <Modal closeCallback={closeModal}>
          <ErrorInfo />
        </Modal>
      )}
      {orderRequest && (
        <Modal closeCallback={() => {}}>
          <OrderWaiting />
        </Modal>
      )}
      {!orderRequest && !orderFailed && order && (
        <Modal closeCallback={closeModalClearBurger}>
          <OrderDetails orderState={order} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerOrder;
