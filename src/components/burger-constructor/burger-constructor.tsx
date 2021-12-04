import React from "react";
import PropTypes, { number, string } from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  LockIcon,
  DragIcon,
  DeleteIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./burger-constructor.module.css";

class BurgerConstructor extends React.Component<{
  ingredients: any;
  data: any;
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={css.main + " mt-25"}>
        <div className={css.container}>
          {/* проверяем булку */}
          {/* {this.props.ingredients["bun"] ? (
            { le}
            <ConstructorElement type={"top"} isLocked={true} />
          ) : ""} */}
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
