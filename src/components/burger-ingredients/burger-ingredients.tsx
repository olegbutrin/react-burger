import React, { RefObject } from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientBox from "./components/ingredient-box/ingredient-box";

import css from "./burger-ingredients.module.css";

import { TListStore } from "../../utils/types";

type TRefsType = Map<string, RefObject<HTMLDivElement | null | undefined>> 

const BurgerIngredients = () => {
  // получаем список ингредиентов из провайдера
  const { productsData } = useSelector((state: TListStore) => ({
    productsData: state.list.ingredients,
  }));

  // устанавливаем значение активного таба
  const [activeType, setActiveType] = React.useState("bun");

  // мапим рефы для дальнейшего использования
  const itemRefs:TRefsType = new Map([
    ["bun", React.useRef()],
    ["sauce", React.useRef()],
    ["main", React.useRef()],
    ["scroller", React.useRef()],
  ]);

  const tabClick: (type: string) => void = (type) => {
    setActiveType(type);
    const ref = itemRefs.get(type)?.current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const scroller = itemRefs.get("scroller")?.current;

    const onScrollerScroll = () => {
      const sauceDiv = itemRefs.get("sauce")?.current;
      const bunDiv = itemRefs.get("bun")?.current;
      const mainDiv = itemRefs.get("main")?.current;
      if (!scroller || !sauceDiv || !bunDiv || !mainDiv) {
        return;
      }
      const sauceMarg = parseInt(
        window
          .getComputedStyle(sauceDiv, null)
          .getPropertyValue("margin-bottom")
      );
      const bunMarg = parseInt(
        window.getComputedStyle(bunDiv, null).getPropertyValue("margin-bottom")
      );
      let active;
      switch (true) {
        case scroller.getBoundingClientRect().y >=
          mainDiv.getBoundingClientRect().y - sauceMarg:
          active = "main";
          break;
        case scroller.getBoundingClientRect().y >=
          sauceDiv.getBoundingClientRect().y - bunMarg:
          active = "sauce";
          break;
        case scroller.getBoundingClientRect().y >=
          bunDiv.getBoundingClientRect().y:
          active = "bun";
          break;
        default:
          break;
      }
      if (active) {
        setActiveType(active);
      }
    };
    if (scroller) {
      scroller.addEventListener("scroll", onScrollerScroll);
      return () => {
        scroller.removeEventListener("scroll", onScrollerScroll);
      };
    }
  });

  const buns = productsData.filter((ingr) => {
    return ingr.type === "bun";
  });
  const sauces = productsData.filter((ingr) => {
    return ingr.type === "sauce";
  });
  const mains = productsData.filter((ingr) => {
    return ingr.type === "main";
  });

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
        ref={itemRefs.get("scroller")  as RefObject<HTMLDivElement>}
      >
        <IngredientBox
          tabRef={itemRefs.get("bun") as RefObject<HTMLDivElement>}
          value="Булки"
          type="bun"
          productsData={buns}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("sauce") as RefObject<HTMLDivElement>}
          value="Соусы"
          type="sauce"
          productsData={sauces}
        ></IngredientBox>
        <IngredientBox
          tabRef={itemRefs.get("main") as RefObject<HTMLDivElement>}
          value="Начинки"
          type="main"
          productsData={mains}
        ></IngredientBox>
      </div>
    </div>
  );
};

export default BurgerIngredients;
