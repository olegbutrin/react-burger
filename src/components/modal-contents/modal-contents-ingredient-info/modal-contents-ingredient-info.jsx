import { PTIngredientData } from "../../../utils/props";

import css from "../modal-contents.module.css";

const ContentsIngredientInfo = (props) => {
  return (
    <div className={css.contents}>
      <p className="text text_type_main-large" style={{ textAlign: "left" }}>
        Детали ингредиента
      </p>
      <img
        className={css.ingrImage + " mr-4 mb-1 ml-4"}
        src={props.productsData.image_large}
        alt={props.productsData.name}
      />
      <p className="text text_type_main-medium mt-4">
        {props.productsData.name}
      </p>
      <div className={css.ingrInfoContainer + " mt-8"}>
        <div className={css.ingrInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {props.productsData.calories}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {props.productsData.proteins}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {props.productsData.fat}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {props.productsData.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

ContentsIngredientInfo.propTypes = {
  productsData: PTIngredientData.isRequired,
};

export default ContentsIngredientInfo;
