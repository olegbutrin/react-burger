import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../../pages/pages.module.css";

const UserLogout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = (event) => {
    event.preventDefault();
    // перенаправление после успешного выхода
    // передается в виде колбека
    dispatch(
      logoutUser(() => {
        history.push({
          pathname: "/",
          state: { from: history.location.pathname },
        });
      })
    );
  };

  return (
    <div>
      <form className={css.container} onSubmit={logout}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Выход из системы</p>
        </div>
        <Button type="primary" size="medium">
          Выход
        </Button>
      </form>
    </div>
  );
};

export default UserLogout;
