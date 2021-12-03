import React from "react";
import AppHeader from "../app-header/app-header";

import mainMenu from "../../utils/menu";

class App extends React.Component {
  headerNavChanged = () => {
    console.log("Header Navigation changed");
  };

  render() {
    return (
      <main>
        <AppHeader menu={mainMenu} callback={this.headerNavChanged} />
      </main>
    );
  }
}

export default App;
