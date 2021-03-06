import React, { RefObject } from "react";

import IngredientPreview from "../ingredient-preview/ingredient-preview";

import css from "./ingredient-box.module.css";

import { IIngredientTypeName, IIngredientData } from "../../../../utils/types";

interface TIngredientBoxProps {
  tabRef?: RefObject<HTMLDivElement>;
  value: string;
  type: IIngredientTypeName;
  productsData: IIngredientData[];
}

// Компонент блока ингредиентов определенного типа
const IngredientBox: React.FC<TIngredientBoxProps> = ({
  tabRef,
  value,
  productsData,
}) => {
  return (
    <div ref={tabRef} className={css.ingrBox + " mb-10"}>
      <p className="text text_type_main-medium">{value}</p>
      <div className={css.ingrList}>
        {productsData.map((item) => {
          return (
            <IngredientPreview
              key={["Preview", item.type, item._id].join("_")}
              productsData={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IngredientBox;
