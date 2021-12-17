import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { API_URL } from "../../utils/defaults";

import css from "./app.module.css";

import mainMenu from "../../utils/menu";

import { ConstructorContext } from "../../utils/constructorContext";

// APP component
const App = () => {
  const [ingredientsState, setIngredientState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  // запускаем асинхронное получение данных через хук при монтировании
  React.useEffect(() => {
    fetch(API_URL + "/ingredients")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error data receive");
        }
        return res.json();
      })
      .then((data) => {
        setIngredientState((prevDataState) => ({
          ...prevDataState,
          ingredients: data.data,
          isLoading: false,
        }));
      })
      .catch((e) => {
        setIngredientState(() => ({
          hasError: true,
          isLoading: false,
          ingredients: [],
        }));
      });
  }, []);

  // рендер в зависимости от данных
  const { ingredients, isLoading, hasError } = ingredientsState;
  return (
    <div className={css.page}>
      <main className={css.main + " mt-10 ml-10 mr-10"}>
        {/* В процессе загрузки показываем сплеш с загрузкой */}
        {isLoading && (
          <div className={css.preload}>
            <p className="text text_type_main-default text_color_inactive">
              загрузка
            </p>
          </div>
        )}
        {/* если ошибка */}
        {hasError && (
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
        {!isLoading && !hasError && ingredients.length && (
          <>
            <AppHeader menu={mainMenu} />
            <ConstructorContext.Provider value={ingredientsState.ingredients}>
              <div className={css.contents}>
                <section className={css.sectionLeft + " mr-5 ml-5"}>
                  <BurgerIngredients />
                </section>
                <section className={css.sectionRight + " mr-5 ml-5"}>
                  <BurgerConstructor />
                </section>
              </div>
            </ConstructorContext.Provider>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
