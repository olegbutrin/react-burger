import React from "react";
import PropTypes from "prop-types";

import { PTMenuItem } from "../../utils/props";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "./components/menu-button/menu-button";

import css from "./app-header.module.css";

// Основной компонент, реализующий заголовок

const AppHeader = (props) => {
  const [activeItem, setActiveItem] = React.useState(1);

  const callbackMenu = (id) => {
    setActiveItem(id);
  };

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.logo}>
          <Logo />
        </div>
        {props.menu.map((button) => (
          <MenuButton
            key={"MenuButton_" + button.id}
            id={button.id}
            icon={button.icon}
            value={button.value}
            active={button.id === activeItem}
            callback={callbackMenu}
          />
        ))}
      </nav>
    </header>
  );
};

AppHeader.propTypes = {
  menu: PropTypes.arrayOf(PTMenuItem),
};

export default AppHeader;
