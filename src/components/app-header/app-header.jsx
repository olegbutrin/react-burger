import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import { PTMenuItem } from "../../utils/props";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "./components/menu-button/menu-button";

import css from "./app-header.module.css";

// Основной компонент, реализующий заголовок

const AppHeader = (props) => {
  const { pathname } = useLocation();

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
            route={button.route}
            active={button.route === pathname}
          />
        ))}
      </nav>
    </header>
  );
};

AppHeader.propTypes = {
  menu: PropTypes.arrayOf(PTMenuItem).isRequired,
};

export default AppHeader;
