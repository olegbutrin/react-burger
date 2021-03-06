import { useSelector, useDispatch } from "../../utils/hooks";
import { useDrop } from "react-dnd";
import { v4 as UUID } from "uuid";

import BurgerContentsItem from "./components/burger-contents-item/burger-contents-item";
import BurgerOrder from "./components/burger-order/burger-order";
import BurgerEmpty from "./components/burger-empty/burger-empty";

import {
  SET_BURGER_BUN,
  ADD_BURGER_PRODUCT,
} from "../../services/constants/ingredient-constructor";

import css from "./burger-constructor.module.css";
import { IBurgerIngredientData } from "../../utils/types";

// Основной класс конструктора бургеров

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, products } = useSelector((state) => state.burger);

  const isEmpty = !bun && products.length === 0;

  const setBun = (item: IBurgerIngredientData) => {
    dispatch({ type: SET_BURGER_BUN, payload: item });
  };

  const addItem = (item: IBurgerIngredientData) => {
    dispatch({
      type: ADD_BURGER_PRODUCT,
      payload: { item: item, index: UUID() },
    });
  };

  const handleDrop = (item: IBurgerIngredientData) => {
    if (item.type === "bun") {
      setBun(item);
    } else {
      addItem(item);
    }
  };

  const [, dropTarget] = useDrop({
    accept: "product",
    drop(item: IBurgerIngredientData) {
      handleDrop(item);
    },
  });

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
