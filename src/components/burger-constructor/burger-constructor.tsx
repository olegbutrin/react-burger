import PropTypes from "prop-types";

import BurgerContents from "./components/burger-contents/burger-contents";
import BurgerOrder from "./components/burger-order/burger-order";

import { IIngredientData, IContentsOrderItem } from "../../utils/types";
import { PTContentsOrderItem, PTIngredientData } from "../../utils/props";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-constructor.module.css";

// Основной класс конструктора бургеров

const BurgerConstructor = (props: {
  productsData: IIngredientData[];
  productsOrder: IContentsOrderItem[];
  selectedBun: string;
  removeCallback: (...args: any[]) => void;
  changeOrderCallback: (...args: any[]) => void;
  doneCallback: (...args: any[]) => void;
}) => {
  // рендер верхней булки
  const topBun = () => {
    const bunData: IIngredientData | undefined = props.productsData.find(
      (data: IIngredientData) => {
        return data._id === props.selectedBun;
      }
    );
    if (bunData) {
      return (
        <div className={css.ingredientPin + " m-2 pl-9 pr-3"}>
          <ConstructorElement
            key={"top-bun"}
            type="top"
            isLocked={true}
            text={bunData.name + " (верх)"}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      );
    } else {
      return "";
    }
  };
  // рендер нижней булки
  const bottomBun = () => {
    const bunData: IIngredientData | undefined = props.productsData.find(
      (data: IIngredientData) => {
        return data._id === props.selectedBun;
      }
    );
    if (bunData) {
      return (
        <div className={css.ingredientPin + " m-2 pl-9 pr-3"}>
          <ConstructorElement
            key={"bottom-bun"}
            type="bottom"
            isLocked={true}
            text={bunData.name + " (низ)"}
            price={bunData.price}
            thumbnail={bunData.image_mobile}
          />
        </div>
      );
    } else {
      return "";
    }
  };

  // получаем общий прайс
  const getSummaryPrice = () => {
    let summ = 0;
    const bunData: IIngredientData | undefined = props.productsData.find(
      (data: IIngredientData) => {
        return data._id === props.selectedBun;
      }
    );
    if (bunData) {
      summ += bunData.price;
    }
    props.productsOrder.forEach((product: IContentsOrderItem) => {
      const item: IIngredientData | undefined = props.productsData.find(
        (data: IIngredientData) => {
          return data._id === product.id;
        }
      );
      if (item) {
        summ += item.price;
      }
    });
    return summ;
  };

  // получаем список ингредиентов
  const getOrderList = () => {
    let orderList = props.productsOrder.map((item: IContentsOrderItem) => {
      return item.id;
    });
    orderList.push(props.selectedBun);
    return orderList;
  };

  // получаем фейковый номер заказа
  const getOrderID = () => {
    const chars = "0123456789";
    const len = Math.ceil(Math.random() * 4) + 2;
    let id = "";
    while (id.length < len) {
      id += chars[Math.floor(Math.random() * 10)];
    }
    return id;
  };

  return (
    <div className={css.main + " mt-25"}>
      {topBun()}
      <BurgerContents
        productsData={props.productsData}
        productsOrder={props.productsOrder}
        removeCallback={props.removeCallback}
        changeOrderCallback={props.changeOrderCallback}
      />
      {bottomBun()}
      <BurgerOrder
        summary={getSummaryPrice()}
        orderID={getOrderID()}
        orderList={getOrderList()}
        doneCallback={props.doneCallback}
      ></BurgerOrder>
    </div>
  );
};

BurgerConstructor.propTypes = {
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  productsOrder: PropTypes.arrayOf(PTContentsOrderItem).isRequired,
  selectedBun: PropTypes.string,
  removeCallback: PropTypes.func,
  changeOrderCallback: PropTypes.func,
  doneCallback: PropTypes.func,
};

export default BurgerConstructor;
