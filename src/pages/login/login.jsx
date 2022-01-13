import React from "react";

import LoginLink from "../../components/login-link/login-link";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import pages from "../pages.module.css";
import css from "./login.module.css";

const LoginPage = () => {
  return (
    <div className={pages.wrapper}>
      <div className={pages.container}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Вход</p>
        </div>
        <div className="pb-6">
          <EmailInput onChange={() => {}} value={""} name={"email"} />
        </div>
        <div className="pb-6">
          <PasswordInput onChange={() => {}} value={""} name={"password"} />
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
      </div>
    </div>
  );
};

export default LoginPage;
