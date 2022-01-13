import React from "react";

import LoginLink from "../../components/login-link/login-link";

import {
  Input, Button
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

const ForgotPasswordPage = () => {
    return (
        <div className={css.wrapper}>
          <div className={css.container}>
            <div className={css.header + " pb-6"}>
              <p className="text text_type_main-medium">Восстановление пароля</p>
            </div>
            <div className="pb-6">
              <Input
                type={"text"}
                placeholder={"Укажите e-mail"}
                onChange={()=>{}}
                value={""}
                name={"email"}
                error={false}
                size={"default"}
              />
            </div>
            <Button type="primary" size="medium">
              Восстановить
            </Button>
            <div className={css.footer + " mt-20"}>
              <div className="mb-4">
                <LoginLink
                  header={"Вспомнили пароль?"}
                  to="/login"
                  text="Войти"
                />
              </div>
            </div>
          </div>
        </div>
      );
}

export default ForgotPasswordPage;