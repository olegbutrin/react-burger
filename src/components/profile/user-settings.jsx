import React, { useState, useEffect } from "react";

import { getUserData } from "../../services/user";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./profile.module.css";

const UserSettings = () => {
  const  { user } = getUserData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } 
  }, [user])

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


  return (
    <form className={css.profileForm}>
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
    </form>
  );
};

export default UserSettings;
