import React from "react";

import { Link, useLocation } from "react-router-dom";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import MenuButton from "./components/menu-button/menu-button";

import css from "./app-header.module.css";

import { IMenuItem } from "../../utils/types";

// Основной компонент, реализующий заголовок

const AppHeader: React.FC<{ menu: IMenuItem[] }> = ({ menu }) => {
  const { pathname } = useLocation<string>();

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <div className={css.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {menu.map((button) => (
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

export default AppHeader;
