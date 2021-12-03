import React from "react";
import AppHeader from "../app-header/app-header";

import appStyles from "./app.module.css";

// Данные
import mainMenu from "../../utils/menu";
import productsData from "../../utils/data";

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  headerNavChanged = (id: any) => {
    console.log("Menu selected: " + id);
  };

  render() {
    return (
      <>
        <header className={"mt-40"}>
          <AppHeader menu={mainMenu} callbackFunc={this.headerNavChanged} />
        </header>
        <main>
          <section></section>
          <section></section>
        </main>
      </>
    );
  }
}

export default App;
