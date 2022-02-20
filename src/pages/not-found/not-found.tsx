import React from "react";

import LoginLink from "../../components/login-link/login-link";

import css from "./not-found.module.css"

const NotFoundPage = () => {
  return (
    <div className={css.container + " pt-20"}>
      <p className="text text_type_main-large">
        Мы сами удивляемся, но что-то пошло не так
      </p>
      <div className="pt-20">
        <LoginLink
          header="Пожалуйста, начните с самого "
          text="начала"
          to="/"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
