import React from "react";
import { useSelector } from "react-redux";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./main-page.module.css";
import { TListStore } from "../../utils/types";

const MainPage = () => {
  // получаем состояние для рендера
  const { ingredients, ingredientRequest, ingredientFailed } = useSelector(
    (store: TListStore) => store.list
  );
  return (
    <>
      {/* загрузочный сплеш */}
      {ingredientRequest && !ingredientFailed && (
        <div className={css.preload}>
          <p className="text text_type_main-default text_color_inactive">
            загрузка данных
          </p>
        </div>
      )}
      {/* сплеш при ошибке загрузки */}
      {ingredientFailed && (
        <div className={css.preload}>
          <InfoIcon type="error" />
          <p className="text text_type_main-default text_color_inactive mt-10">
            ошибка загрузки данных!
          </p>
          <p className="text text_type_main-default text_color_inactive mt-2">
            обратитесь к администрации
          </p>
        </div>
      )}
      {/* основное состояние */}
      {!ingredientRequest && !ingredientFailed && ingredients.length && (
        <>
          <section className={css.sectionLeft + " mr-5 ml-5"}>
            <BurgerIngredients />
          </section>
          <section className={css.sectionRight + " mr-5 ml-5"}>
            <BurgerConstructor />
          </section>
        </>
      )}
    </>
  );
};

export default MainPage;
