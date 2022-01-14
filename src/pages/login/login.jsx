import React, { useState } from "react";

import LoginLink from "../../components/login-link/login-link";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

const LoginPage = () => {
  const {email, setEmail} = useState("");
  const {password, setPassword} = useState("");

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Вход</p>
        </div>
        <div className="pb-6">
          <EmailInput onChange={setEmail} value={email} name={"email"} />
        </div>
        <div className="pb-6">
          <PasswordInput onChange={setPassword} value={password} name={"password"} />
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
