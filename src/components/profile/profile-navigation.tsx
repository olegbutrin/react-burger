import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import css from "./profile.module.css";

const ProfileNavigation = () => {
  const { pathname } = useLocation();

  const isProfile: boolean = pathname === "/profile";
  const isOrders: boolean = pathname.indexOf("/profile/orders") !== -1;
  const isLogout: boolean = pathname === "/logout";

  return (
    <div>
      <div className={"text text_type_main-medium mb-6 mt-2"}>
        <Link className={css.profileLink} to={"/profile"}>
          <span className={isProfile ? "" : " text_color_inactive"}>
            Профиль
          </span>
        </Link>
      </div>
      <div className={"text text_type_main-medium mb-6 mt-2"}>
        <Link className={css.profileLink} to={"/profile/orders"}>
          <span className={isOrders ? "" : " text_color_inactive"}>
            История заказов
          </span>
        </Link>
      </div>
      <p className={"text text_type_main-medium mb-6 mt-2"}>
        <Link className={css.profileLink} to={"/logout"}>
          <span className={isLogout ? "" : " text_color_inactive"}>Выход</span>
        </Link>
      </p>
      {isProfile && (
        <p className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
      {isOrders && (
        <p className="text text_type_main-small text_color_inactive pt-20">
          В этом разделе вы можете посмотреть свою историю заказов
        </p>
      )}
    </div>
  );
};

export default ProfileNavigation;
