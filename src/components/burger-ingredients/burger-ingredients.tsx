import React from "react";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-ingredients.module.css";

import "../app/app.interface";
import {
  IIngredientData,
  IIngredientListType,
  IIngredientSelectedList,
  IIngredientTypeName,
} from "../app/app.interface";

/*

Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка. Одновременно позволяет в дальнейшем легко добавить дополнительный тип ингредиентов.
Метод addIngredient позволяет контролировать количество ингредиентов внутри каждого типа с учетом параметра уникальности.
Например, булку для гамбургера можно выбрать только одну и одного типа, соусов до трех штук одного типа
и до пяти любых начинок

При необходимости (при усложнении) можно вынести блок конкретного ингредиента в отдельный функциональный компонент

*/

// Компонент блока ингредиентов определенного типа

class IngredientTypeBox extends React.Component<{
  value: string;
  type: IIngredientTypeName;
  itemref: any;
  productsData: IIngredientData[];
  selectedIngredients: IIngredientSelectedList;
  selectIngredientCallback: (type: IIngredientTypeName, id: string) => void;
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={css.ingrBox + " mb-10"} ref={this.props.itemref}>
        <p className="text text_type_main-medium">{this.props.value}</p>
        <div className={css.ingrList}>
          {this.props.productsData.map((item: any, index: number) => {
            let itemCount: number = this.props.selectedIngredients[
              this.props.type
            ].filter((count: string) => {
              return count === item._id;
            }).length;
            return (
              <div
                key={item._id}
                className={css.ingrPreview}
                onClick={() => {
                  this.props.selectIngredientCallback(
                    this.props.type,
                    item._id
                  );
                }}
              >
                {itemCount > 0 ? (
                  <Counter count={itemCount} size={"default"} />
                ) : (
                  ""
                )}
                <img
                  className={css.image + " mr-4 mb-1 ml-4"}
                  src={item.image}
                  alt={item.name}
                />
                <div className={css.price}>
                  <p className="text text_type_digits-default">{item.price}</p>
                  <div className={"ml-2"}>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
                <div className={css.name + " mt-1"}>
                  <p className="text text_type_main-small">{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class BurgerIngredients extends React.Component<
  {
    productsData: [IIngredientData];
    ingredientTypes: [IIngredientListType];
    selectedIngredients: IIngredientSelectedList;
    selectIngredientCallback: (type: IIngredientTypeName, id: string) => void;
  },
  {
    activeIngrType: string;
  }
> {
  typeRefs: { value: string; ref: any }[] = [];

  constructor(props: any) {
    super(props);
    this.state = {
      activeIngrType: this.props.ingredientTypes[0].value,
    };
    // для каждого типа ингредиентов создается свой реф, который потом используется в блоке для прокрутки
    this.props.ingredientTypes.forEach((ingr: IIngredientListType) => {
      this.typeRefs.push({ value: ingr.value, ref: React.createRef() });
    });
  }

  // колбек для элеметов Tab прокручивающий список ингредиентов до выбранного блока
  ingredientTabClick = (value: string) => {
    let itemRef = this.typeRefs.find((ref: any) => {
      return ref.value === value;
    });
    if (itemRef && itemRef.ref.current) {
      itemRef.ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
      window.scrollTo(0, 0);
    }

    this.setState((prevState: object) => {
      return { ...prevState, activeIngrType: value };
    });
  };

  render() {
    return (
      <div className={css.main}>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
        <div className={css.menu + " mb-10"}>
          {this.props.ingredientTypes.map(
            (ingr: IIngredientListType, index: number) => {
              return (
                <Tab
                  key={"IngrTab" + index}
                  active={ingr.value === this.state.activeIngrType}
                  value={ingr.value}
                  onClick={this.ingredientTabClick}
                >
                  {ingr.value}
                </Tab>
              );
            }
          )}
        </div>
        <div className={css.container + " custom-scroll"}>
          {this.props.ingredientTypes.map(
            (ingr: IIngredientListType, index: number) => {
              let items = this.props.productsData.filter(
                (item: IIngredientData) => {
                  return item.type === ingr.type;
                }
              );
              let itemRef = this.typeRefs.find((ref: any) => {
                return ref.value === ingr.value;
              }) || { ref: null };
              return (
                <IngredientTypeBox
                  key={"IngrTypeBox" + index}
                  itemref={itemRef.ref}
                  value={ingr.value}
                  type={ingr.type}
                  productsData={items}
                  selectedIngredients={this.props.selectedIngredients}
                  selectIngredientCallback={this.props.selectIngredientCallback}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
