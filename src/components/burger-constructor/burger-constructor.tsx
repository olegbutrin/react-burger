import React from "react";
import PropTypes, { any, number, string } from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-constructor.module.css";

class BurgerIngredient extends React.Component<{
  type: string;
  index: number;
  data: any;
  callback: any;
}> {
  constructor(props: any) {
    super(props);
  }

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

class BurgerConstructor extends React.Component<{
  selectedIngredients: any;
  ingredientsData: any;
  removeElementCallback: any;
}> {
  constructor(props: any) {
    super(props);
  }

  getTopBun() {
    if (this.props.selectedIngredients["bun"]) {
      let bunData = this.props.ingredientsData.find((data: any) => {
        return data._id === this.props.selectedIngredients["bun"][0];
      });
      return (
        <div className={css.ingredientPin + " m-2 pl-9"}>
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
  }

  getBottomBun() {
    if (this.props.selectedIngredients["bun"]) {
      let bunData = this.props.ingredientsData.find((data: any) => {
        return data._id === this.props.selectedIngredients["bun"][0];
      });
      return (
        <div className={css.ingredientPin + " m-2 pl-9"}>
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
  }

  getSummaryPrice() {
    let summ = 0;
    Object.keys(this.props.selectedIngredients).map((type) => {
      this.props.selectedIngredients[type].map((id: string) => {
        summ += this.props.ingredientsData.find((data: any) => {
          return data._id === id;
        }).price;
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
        <div className={css.container + " custom-scroll"}>
          {/* проверяем булку */}
          {this.getTopBun()}
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
          {this.getBottomBun()}
        </div>
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
