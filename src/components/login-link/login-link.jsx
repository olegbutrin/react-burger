import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import css from "./login-link.module.css";

const LoginLink = ({ header, text, to }) => {
  return (
    <p className="text text_type_main-default text_color_inactive">
      {header + " "}
      <Link className={css.link + " text text_type_main-default"} to={to}>
        {text}
      </Link>
    </p>
  );
};

LoginLink.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LoginLink;
