import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import css from "./profile.module.css";

const ProfileNavigation = () => {
  const { pathname } = useLocation();

  const isProfile: () => string = () => {
    if (pathname === "/profile") {
      return "";
    } else {
      return " text_color_inactive";
    }
  };

  const isOrders: () => string =  () => {
    if (pathname.indexOf("/profile/orders") === 0) {
      return "";
    } else {
      return " text_color_inactive";
    }
  };

  return (
    <div>
      <div className={"text text_type_main-medium mb-6 mt-2" + isProfile()}>
        <Link className={css.profileLink} to={"/profile"}>
          Профиль
        </Link>
      </div>
      <div className={"text text_type_main-medium mb-6 mt-2" + isOrders()}>
        <Link className={css.profileLink} to={"/profile/orders"}>
          История заказов
        </Link>
      </div>
      <p className="text text_type_main-medium text_color_inactive mb-6 mt-2">
        <Link className={css.profileLink} to={"/logout"}>
          Выход
        </Link>
      </p>
      {isProfile() === "" && (
        <p className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
      {isOrders() === "" && (
        <p className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете посмотреть свою историю заказов
        </p>
      )}
    </div>
  );
};

export default ProfileNavigation;
