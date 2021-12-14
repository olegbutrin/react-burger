import PropTypes from "prop-types";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./menu-button.module.css";

const MenuButton = (props: {
  id: number;
  icon: string;
  value: string;
  active: boolean;
  callback: (id: number) => void;
}) => {
  const itemIcon = (() => {
    switch (props.icon) {
      case "burger":
        return <BurgerIcon type={props.active ? "primary" : "secondary"} />;
      case "list":
        return <ListIcon type={props.active ? "primary" : "secondary"} />;
      case "profile":
        return <ProfileIcon type={props.active ? "primary" : "secondary"} />;
      default:
        return <></>;
    }
  })();

  const cssName = (() => {
    switch (props.id) {
      case 1:
        return css.menuButton1;
      case 2:
        return css.menuButton2;
      case 3:
      default:
        return css.menuButton3;
    }
  })();

  const className = props.active
    ? "text text_type_main-default"
    : "text text_type_main-default text_color_inactive";

  const setActive = () => {
    props.callback(props.id);
  };

  return (
    <div className={cssName + " mt-4 mr-2 mb-4 ml-2 p-4"} onClick={setActive}>
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
  callback: PropTypes.func,
};

export default MenuButton;
