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
  const itemIcon = (name: string, active: boolean) => {
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

  const clickFn = () => {
    props.callback(props.id);
  };

  const className = props.active
    ? "text text_type_main-default"
    : "text text_type_main-default text_color_inactive";

  const order = props.id < 3 ? props.id : props.id + 1;

  return (
    <div
      className={css.menuButton + " mt-4 mr-2 mb-4 ml-2 p-4"}
      style={{ order: order }}
      onClick={clickFn}
    >
      <div className="mr-2">{itemIcon(props.icon, props.active)}</div>
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
