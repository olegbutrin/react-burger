import { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  SWAP_BURGER_PRODUCTS,
  REMOVE_BURGER_PRODUCT,
} from "../../../../services/actions/ingredient-constructor";

import { PTIngredientData } from "../../../../utils/props";

import css from "./burger-contents-item.module.css";

const BurgerContentsItem = (props) => {
  const dispatch = useDispatch();
  const itemRef = useRef(null);

  // определяем драг для
  const [, drag] = useDrag({
    type: "constructor",
    item: props.data,
  });

  const [, drop] = useDrop({
    accept: "constructor",
    hover(item, monitor) {
      if (!itemRef.current) {
        return;
      }

      const hoverIndex = item.index;
      const dropIndex = props.data.index;

      if (hoverIndex === dropIndex) {
        return;
      }

      const itemBounds = itemRef.current?.getBoundingClientRect();
      const itemCenter = (itemBounds.bottom - itemBounds.top) / 2;
      const monitorOffset = monitor.getClientOffset();
      const itemY = monitorOffset.y - itemBounds.top;

      if (hoverIndex > dropIndex && itemY > itemCenter) {
        return;
      }
      if (hoverIndex < dropIndex && itemY < itemCenter) {
        return;
      }

      // перехватываем возможную ошибку DnD (Uncaught Invariant Violation: Expected to find a valid target)
      setTimeout(() => {
        dispatch({
          type: SWAP_BURGER_PRODUCTS,
          payload: { source: props.data, dest: item },
        });
      });
    },
  });

  drag(drop(itemRef));

  // диспатчер удаления
  const removeItem = (item) => {
    dispatch({ type: REMOVE_BURGER_PRODUCT, payload: item });
  };

  // колбек для удаления продукта из бургера
  const handleClose = () => {
    removeItem(props.data);
  };

  // переменные для настроек
  let itemClass, extraStyle, extraName, draggable;
  let itemType;

  switch (props.type) {
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
    default:
      break;
  }

  return draggable ? (
    <div className={itemClass + extraStyle} ref={itemRef}>
      <div className={css.icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={props.data.name + extraName}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
        isLocked={!draggable}
        type={itemType}
        handleClose={handleClose}
      />
    </div>
  ) : (
    <div className={itemClass + extraStyle}>
      <ConstructorElement
        text={props.data.name + extraName}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
        isLocked="true"
        type={itemType}
      />
    </div>
  );
};

BurgerContentsItem.propTypes = {
  data: PTIngredientData.isRequired,
  type: PropTypes.oneOf(["top", "bottom", "center"]),
  index: PropTypes.number.isRequired,
};

export default BurgerContentsItem;
