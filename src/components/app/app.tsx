import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import {
  IIngredientData,
  IIngredientListType,
  IIngredientSelectedList,
  IMenuItem,
} from "../app/app.interfaces";

import css from "./app.module.css";

class App extends React.Component<
  {
    menuData: IMenuItem[];
    productsData: IIngredientData[];
    ingredientTypes: IIngredientListType[];
  },
  { selectedIngredients: IIngredientSelectedList }
> {
  constructor(props: any) {
    super(props);
    let itypes: { [key: string]: string[] } = {};

    this.props.ingredientTypes.forEach((ingr: IIngredientListType) => {
      if (ingr.initial) {
        const first: any = this.props.productsData.find(
          (product: IIngredientData) => {
            return product.type === ingr.type;
          }
        );
        if (first as IIngredientData) {
          itypes[ingr.type] = [first._id];
        } else {
          itypes[ingr.type] = [];
        }
      } else {
        itypes[ingr.type] = [];
      }
    });
    this.state = {
      selectedIngredients: itypes,
    };
  }

  headerNavChanged = (id: any) => {
    console.log("Menu selected: " + id);
  };

  selectIngredient = (type: string, id: string) => {
    this.setState((prevState: any) => {
      const state = {
        ...prevState,
        selectedIngredients: {
          ...prevState.selectedIngredients,
        },
      };

      const ingrType = this.props.ingredientTypes.find(
        (ingr: IIngredientListType) => {
          return ingr.type === type;
        }
      );

      if (ingrType) {
        let ingrSel = [...prevState.selectedIngredients[ingrType.type]];
        // Если в настройках типа ингредиента установлен флаг уникальный (булка должна одна), то чистим нужный массив от других ингредиентов
        if (ingrType && ingrType.unique) {
          ingrSel = ingrSel.filter((item: any) => {
            return item === id;
          });
        }
        // // добавляем ингредиент в список
        ingrSel = [...ingrSel, id];
        // // если количество ингредиентов в списке больше максимального, отрезаем первый
        if (ingrType && ingrSel.length > ingrType.max) {
          ingrSel.splice(0, 1);
        }

        if (ingrType) {
          state.selectedIngredients[ingrType.type] = ingrSel;
        }
      }
      return state;
    });
  };

  deselectIngredient = (type: string, index: number): void => {
    this.setState((prevState: any) => {
      const ingrSel = [...prevState.selectedIngredients[type]];
      ingrSel.splice(index, 1);
      const state = {
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
    let data: Array<IIngredientData> = [];
    Object.keys(this.state.selectedIngredients).forEach((key: string) => {
      const ids = this.state.selectedIngredients[key];
      data = [
        ...data,
        ...this.props.productsData.filter((item: any) => {
          return ids.includes(item._id);
        }),
      ];
      return data;
    });
    return data;
  }

  render() {
    return (
      <div className={css.page}>
        <main className={css.main + " mt-10 ml-10 mr-10"}>
          <AppHeader
            menu={this.props.menuData}
            callbackFunc={this.headerNavChanged}
          />

          <div className={css.contents}>
            <section className={css.sectionLeft + " mr-5 ml-5"}>
              <BurgerIngredients
                productsData={this.props.productsData}
                ingredientTypes={this.props.ingredientTypes}
                selectedIngredients={this.state.selectedIngredients}
                selectIngredientCallback={this.selectIngredient}
              />
            </section>
            <section className={css.sectionRight + " mr-5 ml-5"}>
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
