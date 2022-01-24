import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import css from "../order-details/order-details.module.css";

const IngredientDetails = () => {
  const history = useHistory;

  const { ingredients } = useSelector((store) => store.list);
  const { id } = useParams();
  const data = ingredients.find((item) => {
    return item._id === id;
  });
  return ingredients.length && data ? (
    <div className={css.contents}>
      <img
        className={css.ingrImage + " mr-4 mb-1 ml-4"}
        src={data.image_large}
        alt={data.name}
      />
      <p className="text text_type_main-medium mt-4">{data.name}</p>
      <div className={css.ingrInfoContainer + " mt-8"}>
        <div className={css.ingrInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {data.calories}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {data.proteins}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {data.fat}
          </p>
        </div>
        <div className={css.ingrInfoItem + " ml-5"}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className={css.contents}>
      <p className="text text_type_main-default text_color_inactive pt-6">
        Данные загружаются
      </p>
    </div>
  );
};

export default IngredientDetails;
