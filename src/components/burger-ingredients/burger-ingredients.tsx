import React from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";

import {
  IIngredientData,
  IIngredientListType,
  IIngredientTypeName,
} from "../../utils/types";

import { PTIngredientData } from "../../utils/props";

import css from "./burger-ingredients.module.css";

/*

Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка. Одновременно позволяет в дальнейшем легко добавить дополнительный тип ингредиентов.
Метод addIngredient позволяет контролировать количество ингредиентов внутри каждого типа с учетом параметра уникальности.
Например, булку для гамбургера можно выбрать только одну и одного типа, соусов до трех штук одного типа
и до пяти любых начинок

*/

const BurgerIngredients = (props: {
  productsData: IIngredientData[];
  selectedIngredients: IIngredientData[];
  ingredientTypes: Map<IIngredientTypeName, IIngredientListType>;
  selectCallback: (...args: any[]) => void;
}) => {
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const [activeType, setActiveType] = React.useState(
    [...props.ingredientTypes.keys()][0]
  );

  const getRefByType = (
    type: IIngredientTypeName
  ): React.MutableRefObject<null> => {
    switch (type) {
      case "bun":
        return bunRef;
      case "sauce":
        return sauceRef;
      case "main":
        return mainRef;
    }
  };

  const scrollTo = (ref: any) => {
    if (ref != null && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
      window.scrollTo(0, 0);
    }
  };

  const tabClick = (type: IIngredientTypeName) => {
    const ref = getRefByType(type);
    if (ref != null) {
      scrollTo(ref);
    }
    setActiveType(type);
  };

  return (
    <div className={css.main}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={css.menu + " mb-10"}>
        {[...props.ingredientTypes.keys()].map(
          (typeName: IIngredientTypeName, index: number) => {
            const clickFn = () => {
              tabClick(typeName);
            };

            return (
              <Tab
                key={"IngrTab_" + (index + 1)}
                value={typeName}
                active={typeName === activeType}
                onClick={clickFn}
              >
                {props.ingredientTypes.get(typeName)?.value}
              </Tab>
            );
          }
        )}
      </div>
      <div className={css.container + " custom-scroll"}>
        {[...props.ingredientTypes.keys()].map(
          (typeName: IIngredientTypeName, index: number) => {
            const items = props.productsData.filter((item: IIngredientData) => {
              return item.type === typeName;
            });
            const ref = getRefByType(typeName);
            return (
              <IngredientBox
                key={"IngrBox_" + (index + 1)}
                itemRef={ref}
                value={props.ingredientTypes.get(typeName)?.value || ""}
                type={typeName}
                productsData={items}
                selectedIngredients={props.selectedIngredients}
                selectIngredientCallback={props.selectCallback}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  productsData: PropTypes.arrayOf(PTIngredientData).isRequired,
  selectedIngredients: PropTypes.arrayOf(PTIngredientData).isRequired,
  ingredientTypes: PropTypes.instanceOf(Map),
  selectCallback: PropTypes.func,
};

export default BurgerIngredients;
