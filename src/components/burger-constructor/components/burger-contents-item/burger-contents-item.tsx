import { useRef } from "react";
import { useDispatch } from "../../../../utils/hooks";
import { useDrop, useDrag } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  SWAP_BURGER_PRODUCTS,
  REMOVE_BURGER_PRODUCT,
} from "../../../../services/constants/ingredient-constructor";

import { IBurgerIngredientData } from "../../../../utils/types";

import css from "./burger-contents-item.module.css";

type TIgredientPos = "top" | "bottom" | "center";

const BurgerContentsItem: React.FC<{
  data: IBurgerIngredientData;
  type: TIgredientPos;
}> = ({ data, type }) => {
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLInputElement>(null);

  // определяем драг для генерируемого элемента
  // в item передается объект - данные продукта
  const [, drag] = useDrag({
    type: "constructor",
    item: data,
  });

  // определяем дроп для генерируемого элемента
  // если в ховер придет объект с другими данными, произойдет замена продуктов в store
  const [, drop] = useDrop({
    accept: "constructor",
    hover(item: IBurgerIngredientData, monitor) {
      if (!itemRef.current) {
        return;
      }
      // сравниваем
      const hoverIndex = item.index;
      const dropIndex = data.index;

      if (hoverIndex === dropIndex) {
        return;
      }

      const itemBounds = itemRef.current.getBoundingClientRect();
      const itemCenter = (itemBounds.bottom - itemBounds.top) / 2;
      const monitorOffset = monitor.getClientOffset();
      if (monitorOffset && hoverIndex && dropIndex) {
        const itemY = monitorOffset.y - itemBounds.top;

        if (hoverIndex > dropIndex && itemY > itemCenter) {
          return;
        }
        if (hoverIndex < dropIndex && itemY < itemCenter) {
          return;
        }
      }

      dispatch({
        type: SWAP_BURGER_PRODUCTS,
        payload: { source: data, dest: item },
      });
    },
  });

  drag(drop(itemRef));

  // диспатчер удаления
  const removeItem = (item: IBurgerIngredientData) => {
    dispatch({ type: REMOVE_BURGER_PRODUCT, payload: item });
  };

  // колбек для удаления продукта из бургера
  const handleClose = () => {
    removeItem(data);
  };

  // переменные для настроек
  let itemClass: string;
  let extraStyle: string;
  let extraName: string;
  let draggable: boolean;
  let itemType: "top" | "bottom" | undefined;

  switch (type) {
    case "top":
      itemClass = css.itemPin;
      extraStyle = " m-2 pl-9 pr-3";
      extraName = " (верх)";
      draggable = false;
      itemType = "top";
      break;
    case "bottom":
      itemClass = css.itemPin;
      extraStyle = " m-2 pl-9 pr-3";
      extraName = " (низ)";
      draggable = false;
      itemType = "bottom";
      break;
    case "center":
      itemClass = css.item;
      extraStyle = " m-2";
      extraName = "";
      draggable = true;
      break;
  }

  return draggable ? (
    <div className={itemClass + extraStyle} ref={itemRef}>
      <div className={css.icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={data.name + extraName}
        price={data.price}
        thumbnail={data.image_mobile}
        isLocked={!draggable}
        type={itemType}
        handleClose={handleClose}
      />
    </div>
  ) : (
    <div className={itemClass + extraStyle}>
      <ConstructorElement
        text={data.name + extraName}
        price={data.price}
        thumbnail={data.image_mobile}
        isLocked={true}
        type={itemType}
      />
    </div>
  );
};

export default BurgerContentsItem;
