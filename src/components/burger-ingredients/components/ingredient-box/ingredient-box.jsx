import PropTypes from "prop-types";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import { PTIngrListType, PTIngredientData } from "../../../../utils/props";

import css from "./ingredient-box.module.css";

// Компонент блока ингредиентов определенного типа
const IngredientBox = (props) => {
  return (
    <div ref={props.tabRef} className={css.ingrBox + " mb-10"}>
      <p className="text text_type_main-medium">{props.value}</p>
      <div className={css.ingrList}>
        {props.productsData.map((item, index) => {
          const itemCount = index === 0 ? 1 : 0;
          return (
            <IngredientPreview
              key={["Preview", item.type, item._id].join("_")}
              productsData={item}
              count={itemCount}
              previewCallback={props.previewCallback}
            />
          );
        })}
      </div>
    </div>
  );
};

IngredientBox.propTypes = {
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  value: PropTypes.string.isRequired,
  type: PTIngrListType.isRequired,
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
};

export default IngredientBox;
