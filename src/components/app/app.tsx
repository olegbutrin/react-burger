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
const __URL = "https://norma.nomoreparties.space/api/ingredients ";

// хардкод типов ингредиентов
const ingrTypeNames: IIngredientTypeName[] = ["bun", "sauce", "main"];

const ingredientTypes: IIngredientListType[] = [
  { value: "Булки", type: "bun", max: 1, unique: true, initial: true },
  { value: "Соусы", type: "sauce", max: 2, unique: false, initial: false },
  { value: "Начинки", type: "main", max: 3, unique: false, initial: false },
];

// APP component
const App = () => {
  const [dataState, setDataState] = React.useState({
    isLoading: false,
    hasError: false,
    data: { succes: false, data: [] },
  });

  // ввиду проблем с обращением к объекту с полями, определяемыми из переменной,
  // и для разделения отрисовки делаем три отдельных стейта для выбранных ингредиентов

  const [selectedBun, setSelectedBun] = React.useState<string[]>([]);
  const [selectedSauce, setSelectedSauce] = React.useState<string[]>([]);
  const [selectedMain, setSelectedMain] = React.useState<string[]>([]);

  // стейт для работы с модальными окнами
  const [modalState, setShowModal] = React.useState({
    show: false,
    modal: <></>,
  });

  // возвращаем кортеж из описания типа ингредиента, стейта и обработчика стейта
  const getIngrDef = (
    type: IIngredientTypeName
  ): [
    ingrType: IIngredientListType | null,
    ingrState: string[] | null,
    ingrFunc: any
  ] => {
    const ingrType = ingredientTypes.find((item: IIngredientListType) => {
      return item.type === type;
    });
    if (ingrType) {
      switch (type) {
        case "bun":
          return [ingrType, selectedBun, setSelectedBun];
        case "sauce":
          return [ingrType, selectedSauce, setSelectedSauce];
        case "main":
          return [ingrType, selectedMain, setSelectedMain];
      }
    }
    return [null, null, null];
  };

  // запускаем асинхронное получение данных через хук при монтировании
  React.useEffect(() => {
    setDataState((prevDataState) => ({
      ...prevDataState,
      hasError: false,
      isLoading: true,
    }));
    fetch(__URL)
      .then((res) => res.json())
      .then((data) =>
        setDataState((prevDataState) => ({
          ...prevDataState,
          data,
          isLoading: false,
        }))
      )
      .catch((e) => {
        setDataState((prevDataState) => ({
          ...prevDataState,
          hasError: true,
          isLoading: false,
        }));
      });
  }, []);

  // получаем изначальное состояние ингредиентов
  const clearIngredients = () => {
    if (dataState.data.data.length) {
      ingrTypeNames.forEach((type) => {
        const [ingrType, , ingrFunc] = getIngrDef(type);
        if (ingrType != null && ingrFunc != null) {
          if (ingrType.initial) {
            const first: any = dataState.data.data.find(
              (product: IIngredientData) => {
                return product.type === type;
              }
            );
            ingrFunc([first._id]);
          } else {
            ingrFunc([]);
          }
        }
      });
    }
  };

  // создаем список для выбранных ингредиентов сразу же после именения данных
  React.useEffect(() => {
    const first: any = dataState.data.data.find((product: IIngredientData) => {
      return product.type === "bun";
    });
    if (first) {
      setSelectedBun([first._id]);
    }
  }, [dataState.data]);

  // получаем начальный порядок ингредиентов в бургере (когда будет обработка)
  const getProductsOrder = () => {
    let currentOrder: any = [];
    selectedSauce.forEach((id: string, index) => {
      currentOrder.push({ type: "sauce", id: id, index: index });
    });
    selectedMain.forEach((id: string, index) => {
      currentOrder.push({ type: "main", id: id, index: index });
    });
    return currentOrder;
  };

  // колбек для закрытия  модального окна и очистки данных модульного окна
  const closeModal = () => {
    setShowModal({ show: false, modal: <></> });
  };

  // колбек для навигации в заголовке
  const headerNavChanged = (id: number) => {
    console.log("Menu selected: " + id);
  };

  // колбек для выбора ингредиента (с учетом FILO)
  const selectIngredient = (type: IIngredientTypeName, id: string) => {
    const [ingrType, ingrState, ingrFunc] = getIngrDef(type);
    if (ingrState) {
      let ingrSel = [...ingrState];
      if (ingrType && ingrType.unique) {
        ingrSel = ingrSel.filter((item: any) => {
          return item === id;
        });
      }
      ingrSel.push(id);
      if (ingrType && ingrSel.length > ingrType.max) {
        ingrSel.splice(0, 1);
      }
      ingrFunc(ingrSel);
    }
  };

  // колбек для снятия выбора ингредиента (с учетом FILO)
  const deselectIngredient = (
    type: IIngredientTypeName,
    index: number
  ): void => {
    const [, ingrState, ingrFunc] = getIngrDef(type);
    if (ingrState) {
      let ingrSel = [...ingrState];
      ingrSel.splice(index, 1);
      ingrFunc(ingrSel);
    }
  };

  //заглушка для колбека смены порядка ингредиентов внутри конструктора
  const changeItemsOrder = (id: string, index: number, position: number) => {
    console.log("Items Order changed");
  };

  // колбек для выбора ингредиента (модально)
  const addToBurger = (type: IIngredientTypeName, id: string) => {
    // console.log([type, id]);
    const ingredientData = dataState.data.data.find(
      (ingrData: IIngredientData) => {
        return ingrData._id === id;
      }
    );
    if (!ingredientData) {
      return false;
    }
    const modalRoot = document.getElementById("react-modals");
    const modal = (
      <Modal closeCallback={closeModal} element={modalRoot}>
        <ContentsIngredientInfo
          productsData={ingredientData}
          closeCallback={closeModal}
          useCallback={() => {
            closeModal();
            selectIngredient(type, id);
          }}
        />
      </Modal>
    );
    setShowModal({ show: true, modal: modal });
  };

  // колбек для заказа бургера
  const doneBurger = (
    summary: number,
    orderID: string,
    orderList: string[]
  ) => {
    // console.log([summary, orderID, orderList]);
    const modalRoot = document.getElementById("react-modals");
    let modal = <></>;
    if (orderList.length > 1) {
      modal = (
        <Modal closeCallback={closeModal} element={modalRoot}>
          <ContentsOrder
            orderID={orderID}
            summary={summary}
            closeCallback={() => {
              closeModal();
              clearIngredients();
            }}
          />
        </Modal>
      );
    } else {
      modal = (
        <Modal closeCallback={closeModal} element={modalRoot}>
          <ContentsEmpty closeCallback={closeModal} />
        </Modal>
      );
    }
    setShowModal({ show: true, modal: modal });
  };

  // рендер в зависимости от данных
  const { data, isLoading, hasError } = dataState;

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
        {!isLoading && !hasError && data.data.length && (
          <>
            <AppHeader menu={mainMenu} callbackFunc={headerNavChanged} />
            <div className={css.contents}>
              <section className={css.sectionLeft + " mr-5 ml-5"}>
                <BurgerIngredients
                  productsData={dataState.data.data}
                  selectedIngredients={{
                    bun: selectedBun,
                    sauce: selectedSauce,
                    main: selectedMain,
                  }}
                  ingredientTypes={ingredientTypes}
                  selectCallback={addToBurger}
                />
              </section>
              <section className={css.sectionRight + " mr-5 ml-5"}>
                <BurgerConstructor
                  productsData={dataState.data.data}
                  productsOrder={getProductsOrder()}
                  selectedBun={selectedBun[0]}
                  removeCallback={deselectIngredient}
                  changeOrderCallback={changeItemsOrder}
                  doneCallback={doneBurger}
                />
              </section>
            </div>
          </>
        )}
      </main>
      <div id="react-modals"></div>
      {modalState.show && modalState.modal}
    </div>
  );
};

export default App;
