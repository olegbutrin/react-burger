import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData } from "../../../../utils/types";
import { PTIngredientData } from "../../../../utils/props";

import Modal from "../../../modal/modal";
import ContentsOrder from "../../../modal-contents/modal-contents-order/modal-contents-order";

import { OrderContext } from "../../../../utils/orderContext";

import css from "./burger-order.module.css";

// хардкод адреса сервиса заказов
const ORDER_URL = "https://norma.nomoreparties.space/api/orders/";

const BurgerOrder = (props: {
  bunData: IIngredientData | undefined;
  productsData: IIngredientData[];
}) => {
  // расчет общей стоимости
  // если сделать возможность добавления, то следует перенести в состояние useReducer
  const summary = (() => {
    let res = props.productsData.reduce(
      (sum, { price }: { price: number }) => sum + price,
      0
    );
    if (props.bunData) {
      res += props.bunData.price * 2;
    }
    return res;
  })();

  const productsID = (() => {
    let prods = props.productsData.map((ingr: IIngredientData) => {
      return ingr._id;
    });
    if (props.bunData) {
      prods.push(props.bunData._id);
    }
    return prods;
  })();

  // дефолтное состояние заказа
  const defOrderState = {
    name: "",
    order: { number: "****" },
    success: false,
  };
  const [orderState, setOrderState] = React.useState(defOrderState);

  // получаем состояние зкаказа
  const connectForOrderID = () => {
    fetch(ORDER_URL, {
      method: "POST",
      body: JSON.stringify({ ingredients: productsID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error data receive");
        }
        return res.json();
      })
      .then((data) => {
        setOrderState(data);
      })
      .catch((e) => {
        setOrderState({
          ...defOrderState,
          name: "Ошибка соединения с сервером заказов!",
        });
      });
  };

  const [modalState, setModalState] = React.useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const startOrder = () => {
    showModal();
    connectForOrderID();
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
      {modalState && (
        <Modal closeCallback={closeModal}>
          {/* провайдер контекста для модального окна заказа */}
          <OrderContext.Provider value={orderState}>
            <ContentsOrder />
          </OrderContext.Provider>
        </Modal>
      )}
    </div>
  );
};

BurgerOrder.propTypes = {
  bunData: PTIngredientData,
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
};

export default BurgerOrder;
