import { Link } from "react-router-dom";
import { useUserStatus } from "../../../../services/user";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./menu-button.module.css";

import { IMenuItem } from "../../../../utils/types";

const MenuButton: React.FC<IMenuItem> = ({
  id,
  icon,
  value,
  active,
  route,
}) => {
  const { isAuthenticated } = useUserStatus();
  // тип иконки зависит от значения active
  const iconType = active ? "primary" : "secondary";

  const itemIcon = (() => {
    switch (icon) {
      case "burger":
        return <BurgerIcon type={iconType} />;
      case "list":
        return <ListIcon type={iconType} />;
      case "profile":
        return <ProfileIcon type={isAuthenticated ? "success" : iconType} />;
      default:
        return <></>;
    }
  })();

  // дополнительный CSS нужен для гибкого управления позициями конопок и лого внутри flex
  const extraCSS = (() => {
    switch (id) {
      case 1:
        return css.order1;
      case 2:
        return css.order2;
      case 3:
      default:
        return css.order4;
    }
  })();

  const className = active
    ? "text text_type_main-default"
    : "text text_type_main-default text_color_inactive";

  return (
    <div
      className={css.menuButton + " " + extraCSS + " mt-4 mr-2 mb-4 ml-2 p-4"}
    >
      <Link to={route} className={css.menuLink}>
        <div className="mr-2">{itemIcon}</div>
        <span className={className}>{value}</span>
      </Link>
    </div>
  );
};

export default MenuButton;
