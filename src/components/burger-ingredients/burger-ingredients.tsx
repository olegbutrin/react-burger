import React from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";
import Modal from "../modal/modal";
import ContentsIngredientInfo from "../modal-contents/modal-contents-ingredient-info/modal-contents-ingredient-info";

import { IIngredientData } from "../../utils/types";

import css from "./burger-ingredients.module.css";

import { ConstructorContext } from "../../utils/constructorContext";

/*
Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка.

*/

const BurgerIngredients = () => {
  //
  const productsData = React.useContext(ConstructorContext);
  const [activeType, setActiveType] = React.useState("bun");

  // мапим рефы для дальнейшего использования
  const itemRefs = new Map([
    ["bun", React.useRef<null | HTMLDivElement>(null)],
    ["sauce", React.useRef<null | HTMLDivElement>(null)],
    ["main", React.useRef<null | HTMLDivElement>(null)],
  ]);

  const tabClick = (type: string) => {
    setActiveType(type);
    itemRefs.get(type)!.current!.scrollIntoView({ behavior: "smooth" });
  };

  const buns = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "bun";
  });
  const sauces = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "sauce";
  });
  const mains = productsData.filter((ingr: IIngredientData) => {
    return ingr.type === "main";
  });

  const defIngredientState: { product: null | IIngredientData } = {
    product: null,
  };

  const [ingredientState, setIngredientState] =
    React.useState(defIngredientState);
  const [modalState, setModalState] = React.useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const showIngredientInfo = (ingr: IIngredientData) => {
    setIngredientState({ product: ingr });
    showModal();
  };

  return (
    <div className={css.main}>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <div className={css.menu + " mb-10"}>
        <Tab
          key={"TAB_BUN"}
          value="bun"
          active={activeType === "bun"}
          onClick={tabClick}
        >
          Булки
        </Tab>
        <Tab
          key={"TAB_SOUCE"}
          value="sauce"
          active={activeType === "sauce"}
          onClick={tabClick}
        >
          Соусы
        </Tab>
        <Tab
          key={"TAB_MAIN"}
          value="main"
          active={activeType === "main"}
          onClick={tabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={css.container + " custom-scroll"}>
        <IngredientBox
          tabRef={itemRefs.get("bun")!}
          value="Булки"
          type="bun"
          productsData={buns}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("sauce")!}
          value="Соусы"
          type="sauce"
          productsData={sauces}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("main")!}
          value="Начинки"
          type="main"
          productsData={mains}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
      </div>
      {modalState && (
        <Modal closeCallback={closeModal}>
          <ContentsIngredientInfo
            productsData={ingredientState.product!}
          ></ContentsIngredientInfo>
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;
