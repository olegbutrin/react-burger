import PropTypes from "prop-types";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import { IIngredientData } from "../../../../utils/types";

import {
  PTIngrListType,
  PTIngredientData,
  PTRef,
} from "../../../../utils/props";

import css from "./ingredient-box.module.css";

// Компонент блока ингредиентов определенного типа
const IngredientBox = (props: {
  value: string;
  type: string;
  itemRef: React.MutableRefObject<null>;
  productsData: IIngredientData[];
  selectedIngredients: IIngredientData[];
  selectIngredientCallback: (...args: any[]) => void;
}) => {
  return (
    <div className={css.ingrBox + " mb-10"} ref={props.itemRef}>
      <p className="text text_type_main-medium">{props.value}</p>
      <div className={css.ingrList}>
        {props.productsData.map((item: IIngredientData) => {
          const itemCount: number = props.selectedIngredients.filter(
            (ingr: IIngredientData) => {
              return ingr._id === item._id;
            }
          ).length;
          return (
            <IngredientPreview
              key={["Preview", item.type, item._id].join("_")}
              productsData={item}
              count={itemCount}
              selectIngredientCallback={props.selectIngredientCallback}
            />
          );
        })}
      </div>
    </div>
  );
};

IngredientBox.propTypes = {
  value: PropTypes.string.isRequired,
  type: PTIngrListType.isRequired,
  itemRef: PTRef,
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  selectedIngredients: PropTypes.arrayOf(PTIngredientData),
  selectIngredientCallback: PropTypes.func,
};

export default IngredientBox;
