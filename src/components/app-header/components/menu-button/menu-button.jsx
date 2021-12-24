import PropTypes from "prop-types";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./menu-button.module.css";

const MenuButton = (props) => {
  // тип иконки зависит от значения active
  const iconType = props.active ? "primary" : "secondary";

  const itemIcon = (() => {
    switch (props.icon) {
      case "burger":
        return <BurgerIcon type={iconType} />;
      case "list":
        return <ListIcon type={iconType} />;
      case "profile":
        return <ProfileIcon type={iconType} />;
      default:
        return <></>;
    }
  })();

  // дополнительный CSS нужен для гибкого управления позициями конопок и лого внутри flex
  const extraCSS = (() => {
    switch (props.id) {
      case 1:
        return css.order1;
      case 2:
        return css.order2;
      case 3:
      default:
        return css.order4;
    }
  })();

  const className = props.active
    ? "text text_type_main-default"
    : "text text_type_main-default text_color_inactive";

  const setActive = () => {
    props.callback(props.id);
  };

  return (
    <div
      className={css.menuButton + " " + extraCSS + " mt-4 mr-2 mb-4 ml-2 p-4"}
      onClick={setActive}
    >
      <div className="mr-2">{itemIcon}</div>
      <span className={className}>{props.value}</span>
    </div>
  );
};

MenuButton.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default MenuButton;
