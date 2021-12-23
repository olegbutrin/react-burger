import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import BurgerContentsItem from "./components/burger-contents-item/burger-contents-item";
import BurgerOrder from "./components/burger-order/burger-order";

import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
} from "../../services/actions/ingredient-constructor";

import css from "./burger-constructor.module.css";

// Основной класс конструктора бургеров

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { productsData } = useSelector((state) => ({
    productsData: state.app.ingredients,
  }));

  const { bun, products } = useSelector((state) => state.burger);

  const setBun = (item) => {
    dispatch({ type: SET_BURGER_BUN, payload: item });
  };

  const addItem = (item) => {
    dispatch({ type: ADD_BURGER_PRODUCT, payload: item });
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

  // ищем булку
  React.useEffect(() => {
    if (bun === null) {
      const firstBun = productsData.find((prod) => {
        return prod.type === "bun";
      });
      setBun(firstBun);
    }
  }, []);

  return (
    <div className={css.main + " mt-25"} ref={dropTarget}>
      {/* верхняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_TOP", bun._id].join("_")}
          data={bun}
          type="top"
          index={-1}
        />
      )}
      <div className={css.container + " custom-scroll"}>
        {products.map((ingr, index) => {
          return (
            ingr.type !== "bun" && (
              <BurgerContentsItem
                key={["BurgIngr", ingr._id, index].join("_")}
                data={ingr}
                type={"center"}
                index={index}
              />
            )
          );
        })}
      </div>
      {/* нижняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_BOTTOM", bun._id].join("_")}
          data={bun}
          type="bottom"
          index={-1}
        />
      )}
      <BurgerOrder productsData={products} bunData={bun}></BurgerOrder>
    </div>
  );
};

export default BurgerConstructor;
