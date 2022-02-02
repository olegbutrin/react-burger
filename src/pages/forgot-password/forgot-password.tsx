import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserEmail } from "../../services/user";
import { forgotPassword } from "../../services/actions/auth";

import LoginLink from "../../components/login-link/login-link";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

import { TAuthStore } from "../../utils/types";

const ForgotPasswordPage = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");

  const { isLogged, isForgot } = useSelector((store:TAuthStore) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      history.push("/");
    } else if (isForgot) {
      history.push("/reset-password");
    } else {
      setEmail(getUserEmail());
    }
  }, [isLogged, isForgot, history]);

  const onSubmitForgotPassword = (event:FormEvent) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  const changeState = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target;
    setEmail(input.value);
  };

  return (
    <div className={css.wrapper}>
      <form className={css.container} onSubmit={onSubmitForgotPassword}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
        </div>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={changeState}
            value={email}
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
            <LoginLink header={"Вспомнили пароль?"} to="/login" text="Войти" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
