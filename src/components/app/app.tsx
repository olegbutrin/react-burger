import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import css from "./app.module.css";

// Данные
import mainMenu from "../../utils/menu";
import productsData from "../../utils/data";

const ingredients = [
  { value: "Булки", type: "bun", max: 1, unique: true },
  { value: "Соусы", type: "sauce", max: 3, unique: false },
  { value: "Начинки", type: "main", max: 3, unique: false },
];

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  headerNavChanged = (id: any) => {
    console.log("Menu selected: " + id);
  };

  render() {
    return (
      <div className={css.page}>
        <header className={css.header + " mt-10 ml-10 mr-10"}>
          <AppHeader menu={mainMenu} callbackFunc={this.headerNavChanged} />
        </header>
        <main className={css.main}>
          <section className={css.section}>
            <BurgerIngredients data={productsData} ingredients={ingredients} />
          </section>
          <section></section>
        </main>
      </div>
    );
  }
}

export default App;
