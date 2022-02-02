import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { getUserEmail, useUserStatus } from "../../services/user";

import { loginUser } from "../../services/actions/auth";

import LoginLink from "../../components/login-link/login-link";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

import { TCustomHystory } from "../../utils/types";


const LoginPage = () => {
  const history = useHistory<TCustomHystory>();
  const dispatch = useDispatch();

  const { isAuthenticated } = useUserStatus();

  const [email, setEmail] = useState(getUserEmail());
  const [password, setPassword] = useState("");

  // 
  const dest: string = history.location.state.from || "/";

  const changeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target;
    switch (input.name) {
      case "email":
        setEmail(input.value);
        break;
      case "password":
        setPassword(input.value);
        break;
      default:
        break;
    }
  };

  const onSubmitLogin = (event:FormEvent) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
  };

  return isAuthenticated ? (
    <Redirect to={dest}/>
  ) : (
    <div className={css.wrapper}>
      <form className={css.container} onSubmit={onSubmitLogin}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Вход</p>
        </div>
        <div className="pb-6">
          <EmailInput onChange={changeState} value={email} name={"email"} />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={changeState}
            value={password}
            name={"password"}
          />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
        <div className={css.footer + " mt-20"}>
          <div className="mb-4">
            <LoginLink
              header={"Вы — новый пользователь?"}
              to="/register"
              text="Зарегистрироваться"
            />
          </div>
          <div>
            <LoginLink
              header={"Забыли пароль?"}
              to="/forgot-password"
              text="Восстановить пароль"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
