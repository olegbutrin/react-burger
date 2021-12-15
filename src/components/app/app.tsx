import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { IIngredientData } from "../../utils/types";

import css from "./app.module.css";

import mainMenu from "../../utils/menu";

import { ConstructorContext } from "../../utils/constructorContext";

// хардкод URL
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

// хардкод типов ингредиентов

// APP component
const App = () => {
  const [ingredientsState, setIngredientState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  const [selectedIngredients, setSelectedIngredients] = React.useState<
    IIngredientData[]
  >([]);

  // запускаем асинхронное получение данных через хук при монтировании
  React.useEffect(() => {
    fetch(INGREDIENTS_URL)
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

  // создаем список для выбранных ингредиентов сразу же после именения данных
  React.useEffect(() => {
    if (ingredientsState.ingredients.length) {
      // только булки
      const buns = ingredientsState.ingredients.filter(
        (ingr: IIngredientData) => {
          return ingr.type === "bun";
        }
      );
      const startedIngredients: IIngredientData[] = [...buns];
      // ИЗМЕНЕНИЕ от sprint1.
      // Проверка и фильтрация количества булок перенесены в компонент BurgerConstructor
      // шесть случайных ингредиентов, возможно дублирование (следует дополнительно обезопасить key)
      // И для комплекта все доступные булки
      for (let i = 0; i < 6; i++) {
        const idx = (ingredientsState.ingredients.length * Math.random()) | 0;
        startedIngredients.push(ingredientsState.ingredients[idx]);
        // Не удаляем исходный, работаем с дубликатами
        // ingredientsState.ingredients.slice(idx, 1);
      }
      setSelectedIngredients(startedIngredients);
    }
  }, [ingredientsState.ingredients]);

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
            <div className={css.contents}>
              <section className={css.sectionLeft + " mr-5 ml-5"}>
                <BurgerIngredients productsData={ingredients} />
              </section>
              <section className={css.sectionRight + " mr-5 ml-5"}>
                {/* Поскольку на первом этапе в конструктор передавался случайно отфильтрованный набор,
                просто меняем props на контекст с таким же набором */}
                <ConstructorContext.Provider value={selectedIngredients}>
                  <BurgerConstructor />
                </ConstructorContext.Provider>
              </section>
            </div>
          </>
        )}
      </main>
      <div id="react-modals"></div>
    </div>
  );
};

export default App;
