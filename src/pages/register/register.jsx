import React from "react";

import LoginLink from "../../components/login-link/login-link";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

const RegisterPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Регистрация</p>
        </div>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={()=>{}}
            value={""}
            name={"name"}
            error={false}
            size={"default"}
          />
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
              header={"Уже зарегистрированы?"}
              to="/login"
              text="Войти"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
