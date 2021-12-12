import React from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";

import {
  IIngredientData,
  IIngredientListType,
  IIngredientSelectedList,
  IIngredientTypeName,
  ingrTypeNames,
} from "../../utils/types";

import {
  PTIngredientData,
  PTIngredientSelected,
  PTIngrList,
} from "../../utils/props";

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
  selectedIngredients: IIngredientSelectedList;
  ingredientTypes: IIngredientListType[];
  selectCallback: (...args: any[]) => void;
}) => {
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const [activeType, setActiveType] = React.useState(ingrTypeNames[0]);

  const getRefByType = (type: IIngredientTypeName) => {
    switch (type) {
      case "bun":
        return bunRef;
      case "sauce":
        return sauceRef;
      case "main":
        return mainRef;
      default:
        return null;
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

  const getIngrTypeList = (value: string) => {
    return props.ingredientTypes.find((ingrType: IIngredientListType) => {
      return ingrType.type === value;
    });
  };

  const tabClick = (type: string) => {
    const ingrType = getIngrTypeList(type);
    if (ingrType) {
      const ref = getRefByType(ingrType.type);
      if (ref != null) {
        scrollTo(ref);
      }
      setActiveType(ingrType.type);
    }
  };

  return (
    <div className={css.main}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={css.menu + " mb-10"}>
        {props.ingredientTypes.map(
          (ingrType: IIngredientListType, index: number) => {
            return (
              <Tab
                key={"IngrTab_" + (index + 1)}
                value={ingrType.type}
                active={ingrType.type === activeType}
                onClick={tabClick}
              >
                {ingrType.value}
              </Tab>
            );
          }
        )}
      </div>
      <div className={css.container + " custom-scroll"}>
        {props.ingredientTypes.map(
          (ingrType: IIngredientListType, index: number) => {
            const items = props.productsData.filter((item: IIngredientData) => {
              return item.type === ingrType.type;
            });
            const ref = getRefByType(ingrType.type);
            return (
              <IngredientBox
                key={"IngrBox_" + (index + 1)}
                itemRef={ref}
                value={ingrType.value}
                type={ingrType.type}
                productsData={items}
                selectedIngredients={props.selectedIngredients[ingrType.type]}
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
  selectedIngredients: PTIngredientSelected.isRequired,
  ingredientTypes: PropTypes.arrayOf(PTIngrList).isRequired,
  selectCallback: PropTypes.any,
};

export default BurgerIngredients;
