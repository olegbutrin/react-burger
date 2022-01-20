import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUserEmail, getUserName, getUserRefreshToken } from "../../services/user";
import { getProfile, setProfile } from "../../services/actions/auth";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./profile.module.css";

const UserSettings = () => {
  const dispatch = useDispatch();

  const refreshToken = getUserRefreshToken();

  useEffect(() => {
    dispatch(getProfile(refreshToken));
  }, [dispatch, refreshToken]);

  const [name, setName] = useState(getUserName());
  const [email, setEmail] = useState(getUserEmail());
  const [password, setPassword] = useState("");

  const changeState = (event) => {
    const input = event.target;
    switch (input.name) {
      case "name":
        setName(input.value);
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

  const onSubmitChange = (event) => {
    event.preventDefault();
    dispatch(setProfile(email, name, password));
  };

  return (
    <form className={css.profileForm} onSubmit={onSubmitChange}>
      <div className="pb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={changeState}
          icon={"EditIcon"}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="pb-6">
        <Input
          type={"email"}
          placeholder={"Email"}
          onChange={changeState}
          icon={"EditIcon"}
          value={email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="pb-6">
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={changeState}
          icon={"EditIcon"}
          value={password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="pb-6">
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default UserSettings;
