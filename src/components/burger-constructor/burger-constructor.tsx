import PropTypes from "prop-types";

import BurgerContentsItem from "./components/burger-contents-item/burger-contents-item";
import BurgerOrder from "./components/burger-order/burger-order";

import { IIngredientData } from "../../utils/types";
import { PTIngredientData } from "../../utils/props";

import css from "./burger-constructor.module.css";

// Основной класс конструктора бургеров

const BurgerConstructor = (props: {
  productsData: IIngredientData[];
  removeCallback: (...args: any[]) => void;
  doneCallback: (...args: any[]) => void;
}) => {
  // ищем булку
  const bun = props.productsData.find((ingr: IIngredientData) => {
    return ingr.type === "bun";
  });

  return (
    <div className={css.main + " mt-25"}>
      {/* верхняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_TOP", bun._id].join("_")}
          data={bun}
          type="top"
          index={-1}
          removeCallback={props.removeCallback}
        />
      )}
      <div className={css.container + " custom-scroll"}>
        {props.productsData.map((ingr: IIngredientData, index: number) => {
          return (
            ingr.type !== "bun" && (
              <BurgerContentsItem
                key={["BurgIngr", ingr._id].join("_")}
                data={ingr}
                type={"center"}
                index={index}
                removeCallback={props.removeCallback}
              />
            )
          );
        })}
      </div>
      {/* нижняя булка */}
      {bun && (
        <BurgerContentsItem
          key={["BurgIngr_BOTTOM", bun._id].join("_")}
          data={bun}
          type="bottom"
          index={-1}
          removeCallback={props.removeCallback}
        />
      )}
      <BurgerOrder
        productsData={props.productsData}
        doneCallback={props.doneCallback}
      ></BurgerOrder>
    </div>
  );
};

BurgerConstructor.propTypes = {
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  removeCallback: PropTypes.func,
  doneCallback: PropTypes.func,
};

export default BurgerConstructor;
