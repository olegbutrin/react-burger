import PropTypes from "prop-types";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import { IIngredientData } from "../../../../utils/types";

import { PTIngrListType, PTIngredientData } from "../../../../utils/props";

import css from "./ingredient-box.module.css";

// Компонент блока ингредиентов определенного типа
const IngredientBox = (props: {
  value: string;
  type: string;
  itemRef: any;
  productsData: IIngredientData[];
  selectedIngredients: string[];
  selectIngredientCallback: (...args: any[]) => void;
}) => {
  return (
    <div className={css.ingrBox + " mb-10"} ref={props.itemRef}>
      <p className="text text_type_main-medium">{props.value}</p>
      <div className={css.ingrList}>
        {props.productsData.map((item: IIngredientData) => {
          const itemCount: number = props.selectedIngredients.filter(
            (count: string) => {
              return count === item._id;
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
  itemRef: PropTypes.any.isRequired,
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string),
  selectIngredientCallback: PropTypes.any,
};

export default IngredientBox;
