import React from "react";
import PropTypes, { number, string } from "prop-types";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import css from "./app.module.css";

class App extends React.Component<
  { menuData: any; productsData: any; ingredientTypes: any },
  { selectedIngredients: any }
> {
  constructor(props: any) {
    super(props);
    let itypes: any = {};

    this.props.ingredientTypes.forEach((ingr: any) => {
      ingr.initial
        ? (itypes[ingr.type] = [
            this.props.productsData.find((product: any) => {
              return product.type === ingr.type;
            })._id,
          ])
        : (itypes[ingr.type] = []);
    });

    this.state = {
      selectedIngredients: itypes,
    };
  }

  headerNavChanged = (id: any) => {
    console.log("Menu selected: " + id);
  };

  selectIngredient = (type: any, id: any) => {
    this.setState((prevState: any) => {
      let ingrType = this.props.ingredientTypes.find((ingr: any) => {
        return ingr.type === type;
      });
      let ingrSel = [...prevState.selectedIngredients[ingrType.type]];

      // Если в настройках типа ингредиента установлен флаг уникальный (булка должна одна), то чистим нужный массив от других ингредиентов
      if (ingrType.unique) {
        ingrSel = ingrSel.filter((item: any) => {
          return item === id;
        });
      }
      // // добавляем ингредиент в список
      ingrSel = [...ingrSel, id];
      // // если количество ингредиентов в списке больше максимального, отрезаем первый
      if (ingrSel.length > ingrType.max) {
        ingrSel.splice(0, 1);
      }
      let state = {
        ...prevState,
        selectedIngredients: {
          ...prevState.selectedIngredients,
        },
      };
      state.selectedIngredients[ingrType.type] = ingrSel;
      return state;
    });
  };

  deselectIngredient = (type: string, index: number) => {
    console.log([type, index]);
    this.setState((prevState: any) => {
      let ingrSel = [...prevState.selectedIngredients[type]];
      ingrSel.splice(index, 1);
      let state = {
        ...prevState,
        selectedIngredients: {
          ...prevState.selectedIngredients,
        },
      };
      state.selectedIngredients[type] = ingrSel;
      return state;
    });
  };

  // собираем данные выбанных ингредиентов
  getSelectedIngredientsData() {
    let data: any = [];
    Object.keys(this.state.selectedIngredients).map((key) => {
      let ids = this.state.selectedIngredients[key];
      if (ids && ids.length) {
        data = [
          ...data,
          ...this.props.productsData.filter((item: any) => {
            return ids.includes(item._id);
          }),
        ];
        return data;
      }
    });
    return data;
  }

  render() {
    return (
      <div className={css.page}>
        <main className={css.main}>
          <header className={css.header}>
            <AppHeader
              menu={this.props.menuData}
              callbackFunc={this.headerNavChanged}
            />
          </header>
          <div className={css.contents}>
            <section className={css.sectionLeft + " mr-10 ml-5"}>
              <BurgerIngredients
                productsData={this.props.productsData}
                ingredientTypes={this.props.ingredientTypes}
                selectedIngredients={this.state.selectedIngredients}
                selectIngredientCallback={this.selectIngredient}
              />
            </section>
            <section className={css.sectionRight + " mr-5"}>
              <BurgerConstructor
                selectedIngredients={this.state.selectedIngredients}
                ingredientsData={this.getSelectedIngredientsData()}
                removeElementCallback={this.deselectIngredient}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
