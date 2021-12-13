import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import ContentsOrder from "../modal-contents/modal-contents-order/modal-contents-order";
import ContentsEmpty from "../modal-contents/modal-contents-empty/modal-contents-empty";
import ContentsIngredientInfo from "../modal-contents/modal-contents-ingredient-info/modal-contents-ingredient-info";

import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import {
  IIngredientData,
  IIngredientListType,
  IIngredientTypeName,
} from "../../utils/types";

import css from "./app.module.css";

import mainMenu from "../../utils/menu";

// хардкод URL
const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

// хардкод типов ингредиентов

const ingredientTypes: Map<IIngredientTypeName, IIngredientListType> = new Map([
  ["bun", { value: "Булки", max: 1, unique: true, type: "bun", initial: true }],
  [
    "sauce",
    { value: "Соусы", max: 2, unique: false, type: "sauce", initial: false },
  ],
  [
    "main",
    { value: "Начинки", max: 3, unique: false, type: "main", initial: false },
  ],
]);

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

  // стейт для работы с модальными окнами
  const [modalState, setModalState] = React.useState({
    show: false,
    modal: <></>,
  });

  const modalRoot = document.getElementById("react-modals") || document.body;

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

  // получаем изначальное состояние ингредиентов
  // вызывается по закрытию заказа для очистки ингредиентов
  const clearIngredients = () => {
    if (ingredientsState.ingredients.length) {
      let startedIngredients: IIngredientData[] = [];
      ingredientTypes.forEach((options, type: string) => {
        if (options.initial) {
          const idx = ingredientsState.ingredients.findIndex(
            (ingr: IIngredientData) => {
              return ingr.type === type;
            }
          );
          if (idx > -1) {
            const ingr: IIngredientData = ingredientsState.ingredients[idx];
            startedIngredients.push(ingr);
          }
        }
        setSelectedIngredients(startedIngredients);
      });
    }
  };

  // создаем список для выбранных ингредиентов сразу же после именения данных
  React.useEffect(() => {
    if (ingredientsState.ingredients.length) {
      let startedIngredients: IIngredientData[] = [];
      ingredientTypes.forEach((options, type: string) => {
        if (options.initial) {
          const idx = ingredientsState.ingredients.findIndex(
            (ingr: IIngredientData) => {
              return ingr.type === type;
            }
          );
          if (idx > -1) {
            const ingr: IIngredientData = ingredientsState.ingredients[idx];
            startedIngredients.push(ingr);
          }
        }
        setSelectedIngredients(startedIngredients);
      });
    }
  }, [ingredientsState.ingredients]);

  // колбек для закрытия  модального окна и очистки данных модульного окна
  const closeModal = () => {
    setModalState({ show: false, modal: <></> });
  };

  // колбек для выбора ингредиента (с учетом FILO)
  const selectIngredient = (itemData: IIngredientData) => {
    const listDef = ingredientTypes.get(itemData.type);
    if (listDef) {
      let selIngrs = [...selectedIngredients];
      // если тип ингредиента указан уникальным, то чистим список от ингредиентов того же типа
      if (listDef.unique) {
        selIngrs = selIngrs.filter((ingr: IIngredientData) => {
          return ingr.type !== itemData.type;
        });
      }
      // вставляем ингредиент в начало списка
      selIngrs.unshift(itemData);
      let sameTypeIndexes: number[] = [];
      selIngrs.forEach((ingr: IIngredientData, index) => {
        if (ingr.type === itemData.type) {
          sameTypeIndexes.push(index);
        }
      });
      if (sameTypeIndexes.length > listDef.max) {
        const index = sameTypeIndexes[sameTypeIndexes.length - 1];
        selIngrs.splice(index, 1);
      }
      setSelectedIngredients(selIngrs);
    }
  };

  // колбек для снятия выбора ингредиента (с учетом FILO)
  const deselectIngredient = (index: number): void => {
    let selIngrs = [...selectedIngredients];
    selIngrs.splice(index, 1);
    setSelectedIngredients(selIngrs);
  };

  // колбек для выбора ингредиента (модально)
  const addToBurger = (itemData: IIngredientData) => {
    const closeFN = () => {
      closeModal();
      selectIngredient(itemData);
    };

    const modal = (
      <ContentsIngredientInfo
        productsData={itemData}
        closeCallback={closeModal}
        useCallback={closeFN}
      />
    );
    setModalState({ show: true, modal: modal });
  };

  // колбек для заказа бургера
  const doneBurger = (
    summary: number,
    orderID: string,
    orderList: string[]
  ) => {
    let modal = <></>;
    if (orderList.length > 1) {
      const closeFn = () => {
        closeModal();
        clearIngredients();
      };
      modal = (
        <ContentsOrder
          orderID={orderID}
          summary={summary}
          closeCallback={closeFn}
        />
      );
    } else {
      modal = <ContentsEmpty closeCallback={closeModal} />;
    }
    setModalState({ show: true, modal: modal });
  };

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
                <BurgerIngredients
                  productsData={ingredients}
                  selectedIngredients={selectedIngredients}
                  ingredientTypes={ingredientTypes}
                  selectCallback={addToBurger}
                />
              </section>
              <section className={css.sectionRight + " mr-5 ml-5"}>
                <BurgerConstructor
                  productsData={selectedIngredients}
                  removeCallback={deselectIngredient}
                  doneCallback={doneBurger}
                />
              </section>
            </div>
          </>
        )}
      </main>
      <div id="react-modals"></div>
      {modalState.show && (
        <Modal closeCallback={closeModal} element={modalRoot}>
          {modalState.modal}
        </Modal>
      )}
    </div>
  );
};

export default App;
