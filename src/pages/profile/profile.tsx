import { useLocation } from "react-router-dom";

import ProfileNavigation from "../../components/profile/profile-navigation";
import UserSettings from "../../components/profile/user-settings";
import UserOrders from "../../components/profile/user-orders";
import UserLogout from "../../components/profile/user-logout";

import css from "../pages.module.css";

const ProfilePage = () => {
  const { pathname } = useLocation();
  const isProfile:boolean = pathname === "/profile"
  const isOrders:boolean = pathname.indexOf("/profile/orders") !== -1;
  const isLogout:boolean = pathname === "/logout";

  return (
    <div className={css.hwrapper + " pt-30"}>
      <div className={css.container_1_3 + " pr-20"}><ProfileNavigation /></div>
      <div className={css.container_2_3}>
        {isProfile && <UserSettings />}
        {isOrders && <UserOrders />}
        {isLogout && <UserLogout />}
      </div>
      <div className={css.container_3_3 + " pl-20"}></div>
    </div>
  );
};

export default ProfilePage;
