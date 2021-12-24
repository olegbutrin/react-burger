import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import css from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") || document.body;

// модальное окно через портал
const Modal = (props) => {
  // escape press
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      props.closeCallback();
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.closeCallback();
  };

  const stopEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const spanRef = React.useRef(null);

  React.useEffect(() => {
    if (spanRef != null && spanRef.current) {
      spanRef.current.focus();
    }
  }, []);

  const contents = (
    <ModalOverlay closeCallback={closeModal}>
      <div tabIndex={0} className={css.container} onClick={stopEvent}>
        <div className={css.closeButton} onClick={closeModal}>
          <CloseIcon type="primary" />
          <span tabIndex={0} ref={spanRef} onKeyDown={handleEscape}></span>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
  return ReactDOM.createPortal(contents, modalRoot);
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default Modal;
