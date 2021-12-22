import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./app.module.css";
import { getIngredients } from "../../services/actions/app";
import mainMenu from "../../utils/menu";

// APP component
const App = () => {
  // диспетчер для выполнения экшенов редакс
  const dispatch = useDispatch();
  // импорт чистых данных
  const { ingredients, ingredientRequest, ingredientFailed } = useSelector(
    (store) => store.app
  );

  // запускаем асинхронное получение данных через хук при объявлении диспетчера
  React.useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch]);

  return (
    <div className={css.page}>
      <main className={css.main + " mt-10 ml-10 mr-10"}>
        {/* В процессе загрузки показываем сплеш с загрузкой */}
        {ingredientRequest && !ingredientFailed && (
          <div className={css.preload}>
            <p className="text text_type_main-default text_color_inactive">
              загрузка
            </p>
          </div>
        )}
        {/* если ошибка */}
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
        {/* основной блок при загрузке данных */}
        {!ingredientRequest && !ingredientFailed && ingredients.length && (
          <>
            <AppHeader menu={mainMenu} />
            <div className={css.contents}>
              <section className={css.sectionLeft + " mr-5 ml-5"}>
                <BurgerIngredients />
              </section>
              <section className={css.sectionRight + " mr-5 ml-5"}>
                <BurgerConstructor />
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
