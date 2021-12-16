import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData, IComponentTypeName } from "../../../../utils/types";
import { PTIngredientData } from "../../../../utils/props";

import css from "./burger-contents-item.module.css";

const BurgerContentsItem = (props: {
  data: IIngredientData;
  type: IComponentTypeName;
  index: number;
}) => {
  //
  let itemClass, extraStyle, extraName, draggable;
  let itemType: "top" | "bottom" | undefined;

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
  }

  return (
    <div draggable={draggable} className={itemClass + extraStyle}>
      {props.type === "center" && (
        <div className={css.icon}>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        key={[props.data.type, props.index].join("_")}
        text={props.data.name + extraName}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
        isLocked={!draggable}
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
