import React from "react";
import PropTypes, { number, string } from "prop-types";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import appHeaderStyles from "./app-header.module.css";

// Описание формата данных кнопок меню
const menuPropType = PropTypes.shape({
  id: number,
  value: string,
  icon: string,
});

// Вспомогательный компонент для рендеринга кнопок меню
class MenuButton extends React.Component<{
  id: number;
  icon: string;
  value: string;
  active: boolean;
  callback: any;
}> {
  // Функция для выбора иконки меню
  itemIcon = (name: string) => {
    switch (name) {
      case "burger":
        return <BurgerIcon type="primary" />;
      case "list":
        return <ListIcon type="primary" />;
      case "profile":
        return <ProfileIcon type="primary" />;
      default:
        return <></>;
    }
  };

  render() {
    return (
      <div
        className={
          this.props.active
            ? appHeaderStyles.menuButtonActive
            : appHeaderStyles.menuButton
        }
        style={{ order: this.props.id < 3 ? this.props.id : this.props.id + 1 }}
        onClick={() => {
          this.props.callback(this.props.id);
        }}
      >
        {this.itemIcon(this.props.icon)}
        <span className={"text text_type_main-default"}>
          {this.props.value}
        </span>
      </div>
    );
  }
}

// Основной компонент, реализующий заголовок
class AppHeader extends React.Component<
  { menu: any; callbackFunc: any },
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
      <nav className={appHeaderStyles.navigation}>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        {this.props.menu.map((button: any, index: number) => (
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
    );
  }
}

export default AppHeader;
