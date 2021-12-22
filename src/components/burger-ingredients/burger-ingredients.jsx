import React from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";
import Modal from "../modal/modal";
import ContentsIngredientInfo from "../modal-contents/modal-contents-ingredient-info/modal-contents-ingredient-info";

import css from "./burger-ingredients.module.css";

/*
Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка.

*/

const BurgerIngredients = () => {
  const { productsData } = useSelector((state) => ({
    productsData: state.app.ingredients,
  }));
  //
  const [activeType, setActiveType] = React.useState("bun");

  // мапим рефы для дальнейшего использования
  const itemRefs = new Map([
    ["bun", React.useRef(null)],
    ["sauce", React.useRef(null)],
    ["main", React.useRef(null)],
    ["scroller", React.useRef(null)],
  ]);

  const tabClick = (type) => {
    setActiveType(type);
    itemRefs.get(type).current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const onScrollerScroll = () => {
      const scroller = itemRefs.get("scroller").current;
      const sauceMarg = parseInt(
        window
          .getComputedStyle(itemRefs.get("sauce").current, null)
          .getPropertyValue("margin-bottom")
      );
      const bunMarg = parseInt(
        window
          .getComputedStyle(itemRefs.get("bun").current, null)
          .getPropertyValue("margin-bottom")
      );
      let active;
      switch (true) {
        case scroller.getBoundingClientRect().y >=
          itemRefs.get("main").current.getBoundingClientRect().y - sauceMarg:
          active = "main";
          break;
        case scroller.getBoundingClientRect().y >=
          itemRefs.get("sauce").current.getBoundingClientRect().y - bunMarg:
          active = "sauce";
          break;
        case scroller.getBoundingClientRect().y >=
          itemRefs.get("bun").current.getBoundingClientRect().y:
          active = "bun";
          break;
      }
      if (active) {
        setActiveType(active);
      }
    };
    itemRefs
      .get("scroller")
      .current.addEventListener("scroll", onScrollerScroll);
    return () => {
      itemRefs
        .get("scroller")
        .current.removeEventListener("scroll", onScrollerScroll);
    };
  }, []);

  const buns = productsData.filter((ingr) => {
    return ingr.type === "bun";
  });
  const sauces = productsData.filter((ingr) => {
    return ingr.type === "sauce";
  });
  const mains = productsData.filter((ingr) => {
    return ingr.type === "main";
  });

  const defIngredientState = {
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

  const showIngredientInfo = (ingr) => {
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
      <div
        className={css.container + " custom-scroll"}
        ref={itemRefs.get("scroller")}
      >
        <IngredientBox
          tabRef={itemRefs.get("bun")}
          value="Булки"
          type="bun"
          productsData={buns}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("sauce")}
          value="Соусы"
          type="sauce"
          productsData={sauces}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("main")}
          value="Начинки"
          type="main"
          productsData={mains}
          previewCallback={showIngredientInfo}
        ></IngredientBox>
      </div>
      {modalState && (
        <Modal closeCallback={closeModal}>
          <ContentsIngredientInfo
            productsData={ingredientState.product}
          ></ContentsIngredientInfo>
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;
