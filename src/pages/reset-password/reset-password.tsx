import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { useHistory } from "react-router-dom";

import { resetPassword } from "../../services/actions/auth";
import { getUserEmail } from "../../services/user";

import LoginLink from "../../components/login-link/login-link";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../pages.module.css";

const ResetPasswordPage = () => {
  const history = useHistory();

  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const { isLogged, isForgot } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      history.push("/");
    } else if (!isForgot) {
      history.push("/forgot-password");
    }
  }, [isLogged, isForgot, history]);

  const onSubmitResetPassword = (event: FormEvent) => {
    event.preventDefault();
    const email = getUserEmail();
    dispatch(resetPassword(email, password, code));
  };

  const changeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.currentTarget;
    switch (input.name) {
      case "password":
        setPassword(input.value);
        break;
      case "code":
        setCode(input.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={css.wrapper}>
      <form className={css.container} onSubmit={onSubmitResetPassword}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
        </div>
        <div className="pb-6">
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={changeState}
            value={password}
            name={"password"}
            error={false}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={changeState}
            value={code}
            name={"code"}
            error={false}
            size={"default"}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
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

export default ResetPasswordPage;
