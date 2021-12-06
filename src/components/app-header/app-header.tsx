import React from "react";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IMenuItem } from "../app/app.interfaces";

import css from "./app-header.module.css";

// Вспомогательный компонент для рендеринга кнопок меню
class MenuButton extends React.Component<{
  id: number;
  icon: string;
  value: string;
  active: boolean;
  callback: any;
}> {
  // Функция для выбора иконки меню
  itemIcon = (name: string, active: boolean) => {
    switch (name) {
      case "burger":
        return <BurgerIcon type={active ? "primary" : "secondary"} />;
      case "list":
        return <ListIcon type={active ? "primary" : "secondary"} />;
      case "profile":
        return <ProfileIcon type={active ? "primary" : "secondary"} />;
      default:
        return <></>;
    }
  };

  render() {
    return (
      <div
        className={css.menuButton + " mt-4 mr-2 mb-4 ml-2 p-4"}
        style={{ order: this.props.id < 3 ? this.props.id : this.props.id + 1 }}
        onClick={() => {
          this.props.callback(this.props.id);
        }}
      >
        <div className="mr-2">
          {this.itemIcon(this.props.icon, this.props.active)}
        </div>
        <span
          className={
            this.props.active
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          {this.props.value}
        </span>
      </div>
    );
  }
}

// Основной компонент, реализующий заголовок
class AppHeader extends React.Component<
  { menu: IMenuItem[]; callbackFunc: any },
  { activeItem: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { activeItem: 1 };
  }

  // Заглушка для потенциального эвента переключения меню вверх
  menuCallback = (id: any) => {
    this.props.callbackFunc(id);
    this.setState({ activeItem: id });
  };

  render() {
    return (
      <header className={css.header}>
        <nav className={css.navigation}>
          <div className={css.logo}>
            <Logo />
          </div>
          {this.props.menu.map((button: IMenuItem, index: number) => (
            <MenuButton
              key={button.id}
              id={button.id}
              icon={button.icon}
              value={button.value}
              active={button.id === this.state.activeItem}
              callback={this.menuCallback}
            />
          ))}
        </nav>
      </header>
    );
  }
}

export default AppHeader;
