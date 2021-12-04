import React from "react";
import PropTypes, { number, string } from "prop-types";
import {
  Counter,
  CurrencyIcon,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-ingredients.module.css";

const ingredientData = PropTypes.shape({
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  Image_large: string,
  __v: number,
});

/*

Декомпозиция по типу ингредиента (Булки, Соусы, Начинки) обусловлена необходимостью прокрутки
через компонент Tab до начала списка. Одновременно позволяет в дальнейшем легко добавить дополнительный тип ингредиентов.
Метод addIngredient позволяет контролировать количество ингредиентов внутри каждого типа с учетом параметра уникальности.
Например, булку для гамбургера можно выбрать только одну и одного типа, соусов до трех штук одного типа
и до пяти любых начинок

При необходимости (при усложнении) можно вынести блок конкретного ингредиента в отдельный функциональный компонент

*/

// Компонент блока интгредиентов определенного типа

class IngredientTypeBox extends React.Component<
  {
    value: string;
    data: any;
    type: any;
    max: number;
    unique: boolean;
    itemref: any;
  },
  { selectedIngrs: any }
> {
  constructor(props: any) {
    super(props);
    // state.selectedIngrs - обычный массив, где хранятся id ингредиентов
    // в зависимости от настроек типа id может повторяться
    this.state = {
      selectedIngrs: [],
    };
  }

  addIngredient = (id: any) => {
    this.setState((prevState: any) => {
      let selectedIngrs = [...prevState.selectedIngrs];
      if (this.props.unique) {
        selectedIngrs = selectedIngrs.filter((item) => {
          return item === id;
        });
      }
      selectedIngrs.push(id);
      if (selectedIngrs.length > this.props.max) {
        selectedIngrs.splice(0, 1);
      }
      return { ...prevState, selectedIngrs: selectedIngrs };
    });
  };

  render() {
    return (
      <div className={css.ingrBox + " mb-10"} ref={this.props.itemref}>
        <p className="text text_type_main-medium">{this.props.value}</p>
        <div className={css.ingrList}>
          {this.props.data.map((item: any, index: number) => {
            let itemCount: number = this.state.selectedIngrs.filter(
              (count: any) => {
                return count === item._id;
              }
            ).length;
            return (
              <div
                key={index}
                className={css.ingrPreview}
                onClick={() => {
                  this.addIngredient(item._id);
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
    data: any;
    ingredients: any;
  },
  {
    activeIngr: string;
  }
> {
  typeRefs: any = [];

  constructor(props: any) {
    super(props);
    this.state = { activeIngr: this.props.ingredients[0].value };
    // для каждого типа ингредиентов создается свой реф, который потом используется в блоке для прокрутки
    this.props.ingredients.forEach((ingr: any) => {
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
      return { ...prevState, activeIngr: value };
    });
  };

  render() {
    return (
      <div className={css.main}>
        <div className={"mt-10 mb-5"}>
          <p className="text text_type_main-large">Соберите бургер</p>
        </div>
        <div className={css.menu + " mb-10"}>
          {this.props.ingredients.map((ingr: any, index: number) => {
            return (
              <Tab
                key={index}
                active={ingr.value === this.state.activeIngr}
                value={ingr.value}
                onClick={this.ingredientTabClick}
              >
                {ingr.value}
              </Tab>
            );
          })}
        </div>
        <div className={css.container + " custom-scroll"}>
          {this.props.ingredients.map((ingr: any, index: number) => {
            let items = this.props.data.filter((item: any) => {
              return item.type === ingr.type;
            });
            let itemRef = this.typeRefs.find((ref: any) => {
              return ref.value === ingr.value;
            });
            return (
              <IngredientTypeBox
                key={index}
                itemref={itemRef.ref}
                value={ingr.value}
                type={ingr.type}
                max={ingr.max}
                unique={ingr.unique}
                data={items}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
