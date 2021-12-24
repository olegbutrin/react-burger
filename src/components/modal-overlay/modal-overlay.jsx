import React from "react";
import PropTypes from "prop-types";
import css from "./modal-overlay.module.css";

// оверлей для модального окна
const ModalOverlay = (props) => {
  return (
    <div onClick={props.closeCallback} className={css.background}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default ModalOverlay;
