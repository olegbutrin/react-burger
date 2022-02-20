import React from "react";
import { Link } from "react-router-dom";

import css from "./login-link.module.css";

const LoginLink: React.FC<{
  header?: string;
  text: string;
  to: string;
}> = ({ header, text, to }) => {
  return (
    <p className="text text_type_main-default text_color_inactive">
      {header + " "}
      <Link className={css.link + " text text_type_main-default"} to={to}>
        {text}
      </Link>
    </p>
  );
};

export default LoginLink;
