import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  IIngredientData,
  IIngredientSelectedList,
} from "../app/app.interfaces";

import css from "./burger-constructor.module.css";

// Определяем класс для изменяемого ингредиента. В нем используется проброшенный колбэк для удаления ингредиента.
class BurgerIngredient extends React.Component<{
  type: string;
  index: number;
  data: any;
  callback: any;
}> {
  render() {
    return (
      <div draggable={true} className={css.ingredient + " m-2"}>
        <div className={css.icon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          key={[this.props.type, this.props.index].join("_")}
          text={this.props.data.name}
          price={this.props.data.price}
          thumbnail={this.props.data.image_mobile}
          handleClose={() => {
            this.props.callback(this.props.type, this.props.index);
          }}
        />
      </div>
    );
  }
}

// Основной класс конструктора бургеров

class BurgerConstructor extends React.Component<{
  selectedIngredients: IIngredientSelectedList;
  ingredientsData: IIngredientData[];
  removeElementCallback: (type: string, index: number) => void;
}> {
  // Половинки булок
  getTopBun() {
    if (this.props.selectedIngredients["bun"]) {
      const bunData: IIngredientData | undefined =
        this.props.ingredientsData.find((data: any) => {
          return data._id === this.props.selectedIngredients["bun"][0];
        });
      if (bunData) {
        return (
          <div className={css.ingredientPin + " m-2 pl-9 pr-3"}>
            <ConstructorElement
              key={"top"}
              type="top"
              isLocked={true}
              text={bunData.name + " (верх)"}
              price={bunData.price}
              thumbnail={bunData.image_mobile}
            />
          </div>
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getBottomBun() {
    if (this.props.selectedIngredients["bun"]) {
      const bunData: IIngredientData | undefined =
        this.props.ingredientsData.find((data: any) => {
          return data._id === this.props.selectedIngredients["bun"][0];
        });
      if (bunData) {
        return (
          <div className={css.ingredientPin + " m-2 pl-9 pr-3"}>
            <ConstructorElement
              key={"bottom"}
              type="bottom"
              isLocked={true}
              text={bunData.name + " (низ)"}
              price={bunData.price}
              thumbnail={bunData.image_mobile}
            />
          </div>
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  // Суммаризатор (возможно, объединить с кнопкой для отработки чека)
  getSummaryPrice() {
    let summ = 0;
    Object.keys(this.props.selectedIngredients).forEach((type) => {
      this.props.selectedIngredients[type].forEach((id: string) => {
        const price: IIngredientData | undefined =
          this.props.ingredientsData.find((data: IIngredientData) => {
            return data._id === id;
          });
        if (price) {
          summ += price.price;
        }
      });
    });
    return (
      <div className={css.priceValue + " mr-10"}>
        <p className="text text_type_digits-medium mr-3">{summ}</p>
        <CurrencyIcon type="primary" />
      </div>
    );
  }

  render() {
    return (
      <div className={css.main + " mt-25"}>
        {/* проверяем булку */}
        {this.getTopBun()}
        <div className={css.container + " custom-scroll"}>
          {this.props.selectedIngredients.sauce.map(
            (id: string, index: number) => {
              return (
                <BurgerIngredient
                  index={index}
                  data={this.props.ingredientsData.find((data: any) => {
                    return data._id === id;
                  })}
                  type={"sauce"}
                  callback={this.props.removeElementCallback}
                />
              );
            }
          )}
          {this.props.selectedIngredients.main.map(
            (id: string, index: number) => {
              return (
                <BurgerIngredient
                  index={index}
                  data={this.props.ingredientsData.find((data: any) => {
                    return data._id === id;
                  })}
                  type={"main"}
                  callback={this.props.removeElementCallback}
                />
              );
            }
          )}
        </div>
        {this.getBottomBun()}
        <div className={css.orderContainer + " mt-10 mr-4"}>
          {this.getSummaryPrice()}
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
