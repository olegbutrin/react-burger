import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import css from "./modal-overlay.module.css";

// оверлей для модального окна
const ModalOverlay = (props: {
  children: ReactElement | ReactElement[] | Symbol;
  closeCallback: (e: any) => void;
}) => {
  return (
    <div onClick={props.closeCallback} className={css.background}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element,
  closeCallback: PropTypes.func,
};

export default ModalOverlay;
