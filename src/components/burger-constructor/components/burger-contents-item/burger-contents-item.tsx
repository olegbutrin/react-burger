import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData, IIngredientTypeName } from "../../../../utils/types";
import { PTIngredientData, PTIngrListType } from "../../../../utils/props";

import css from "./burger-contents-item.module.css";

const BurgerContentsItem = (props: {
  data: IIngredientData;
  type: IIngredientTypeName;
  index: number;
  removeCallback: (...args: any[]) => void;
}) => {
  return (
    <div draggable={true} className={css.item + " m-2"}>
      <div className={css.icon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        key={[props.type, props.index].join("_")}
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image_mobile}
        handleClose={() => {
          props.removeCallback(props.type, props.index);
        }}
      />
    </div>
  );
};

BurgerContentsItem.propTypes = {
  data: PTIngredientData.isRequired,
  type: PTIngrListType.isRequired,
  index: PropTypes.number.isRequired,
  removeCallback: PropTypes.any,
};

export default BurgerContentsItem;
