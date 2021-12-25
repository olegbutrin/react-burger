import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import BurgerContentsItem from "./components/burger-contents-item/burger-contents-item";
import BurgerOrder from "./components/burger-order/burger-order";
import BurgerEmpty from "./components/burger-empty/burger-empty";

import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
} from "../../services/actions/ingredient-constructor";

import css from "./burger-constructor.module.css";

// Основной класс конструктора бургеров

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, products, currentIndex, isEmpty } = useSelector(
    (state) => state.burger
  );

  const setBun = (item) => {
    dispatch({ type: SET_BURGER_BUN, payload: item });
  };

  const addItem = (item) => {
    dispatch({
      type: ADD_BURGER_PRODUCT,
      payload: { item: item, index: currentIndex + 1 },
    });
  };

  const handleDrop = (item) => {
    if (item.type === "bun") {
      setBun(item);
    } else {
      addItem(item);
    }
  };

  const [, dropTarget] = useDrop({
    accept: "product",
    drop(item) {
      handleDrop(item);
    },
  });

  // логика для генерации уникальных ключей построена на использовании в стейте счетчика currentIndex
  // при каждом добавлении нового ингредиента счетчик увеличивается на единицу
  // в поле index в данные ингредиента прописывается значение при добавлении
  return (
    <div className={css.main + " mt-25"} ref={dropTarget}>
      {/* верхняя булка */}
      {bun && <BurgerContentsItem data={bun} type="top" />}
      <div className={css.container + " custom-scroll"}>
        {products.map((ingr) => {
          return (
            <BurgerContentsItem
              key={["BurgIngr", ingr.index].join("_")}
              data={ingr}
              type={"center"}
            />
          );
        })}
      </div>
      {/* нижняя булка */}
      {bun && <BurgerContentsItem data={bun} type="bottom" />}
      {/* в зависимости от состояния выводим кнопку заказа или заглушку */}
      {!isEmpty && bun ? (
        <BurgerOrder />
      ) : (
        <BurgerEmpty missingBun={!isEmpty && !bun} />
      )}
    </div>
  );
};

export default BurgerConstructor;
