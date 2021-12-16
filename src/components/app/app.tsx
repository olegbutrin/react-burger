import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import {
  IIngredientData,
  ISelectedIngrActs,
  ISelectedIngrState,
  ISelectedIngrAction,
} from "../../utils/types";

import css from "./app.module.css";

import mainMenu from "../../utils/menu";

import { ConstructorContext } from "../../utils/constructorContext";

// хардкод URL
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

const selectedIngrDef: ISelectedIngrState = { bun: null, products: [] };

// функция-редюсер для контроля ингредиентов для бургера
const selectedIngrReducer = (
  state: ISelectedIngrState,
  action: ISelectedIngrAction
): ISelectedIngrState => {
  const currentState = { ...state };
  switch (action.type) {
    // функция добавления ингредиента
    case "add":
      if (action.product.type === "bun") {
        currentState.bun = action.product;
      } else {
        currentState.products = [...currentState.products, action.product];
      }
      break;
    // функция удаления ингредиента
    case "remove":
      currentState.products.slice(action.index, 1);
      break;
    // функция наваливания ингредиентов кучей
    case "push":
      action.products.forEach((ingr: IIngredientData) => {
        if (ingr.type === "bun") {
          currentState.bun = ingr;
        } else {
          currentState.products = [...currentState.products, ingr];
        }
      });
      break;
    case "clear":
      return selectedIngrDef;
    default:
      throw new Error(`Unknown action: "${action.type}"`);
  }
  return currentState;
};

// APP component
const App = () => {
  const [ingredientsState, setIngredientState] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  // перепишем хук useState на useReducer и как бы будем использовать в burger-ingredients и burger-components
  const [selectedIngredients, selectedIngredientsDispatcher] = React.useReducer(
    selectedIngrReducer,
    selectedIngrDef,
    undefined
  );

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
      // Проверка и фильтрация количества булок перенесены в reducer
      // шесть случайных ингредиентов, возможно дублирование (следует дополнительно обезопасить key)
      // и для комплекта все доступные булки
      for (let i = 0; i < 6; i++) {
        const idx = (ingredientsState.ingredients.length * Math.random()) | 0;
        startedIngredients.push(ingredientsState.ingredients[idx]);
        // Не удаляем исходный, работаем с дубликатами
        // ingredientsState.ingredients.slice(idx, 1);
      }
      // используем метод pull хука
      selectedIngredientsDispatcher({
        type: ISelectedIngrActs.push,
        products: startedIngredients,
      });
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
                <ConstructorContext.Provider
                  value={{ selectedIngredients, selectedIngredientsDispatcher }}
                >
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
