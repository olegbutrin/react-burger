import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import {Redirect } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";
import { useUserStatus } from "../../services/user";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../../pages/pages.module.css";

const UserLogout = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useUserStatus();

  const logout = (event:FormEvent) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return ( isAuthenticated ? 
    (<div>
      <form className={css.container} onSubmit={logout}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Выход из системы</p>
        </div>
        <Button type="primary" size="medium">
          Выход
        </Button>
      </form>
    </div>) : (<Redirect to={"/"} />)
  );
};

export default UserLogout;
