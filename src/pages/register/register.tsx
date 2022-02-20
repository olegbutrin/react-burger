import React, { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoginLink from "../../components/login-link/login-link";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../../services/actions/auth";

import css from "../pages.module.css";

import { TAuthStore } from "../../utils/types";

const RegisterPage = () => {
  const history = useHistory();

  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLogged } = useSelector((store: TAuthStore) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      history.push("/");
    }
  }, [isLogged, history]);

  const onSubmitRegistration = (event: FormEvent) => {
    event.preventDefault();
    dispatch(registerUser(user, email, password));
  };

  const changeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    switch (input.name) {
      case "user":
        setUser(input.value);
        break;
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

  return (
    <div className={css.wrapper}>
      <form className={css.container} onSubmit={onSubmitRegistration}>
        <div className={css.header + " pb-6"}>
          <p className="text text_type_main-medium">Регистрация</p>
        </div>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={changeState}
            value={user || ""}
            name={"user"}
            error={false}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <EmailInput
            onChange={changeState}
            value={email || ""}
            name={"email"}
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={changeState}
            value={password || ""}
            name={"password"}
          />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
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
  );
};

export default RegisterPage;
