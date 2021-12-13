import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import css from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") || document.body;

// модальное окно через портал
const Modal = (props: {
  children: ReactElement | ReactElement[] | Symbol;
  closeCallback: (...args: any[]) => void;
}) => {
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 27) {
      props.closeCallback();
    }
  };

  const spanRef: any = React.useRef(null);

  React.useEffect(() => {
    if (spanRef != null && spanRef.current) {
      spanRef.current.focus();
    }
  }, []);

  const contents = (
    <ModalOverlay closeCallback={props.closeCallback}>
      <div
        tabIndex={0}
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={css.closeButton} onClick={props.closeCallback}>
          <CloseIcon type="primary" />
          <span tabIndex={0} ref={spanRef} onKeyDown={handleKeyDown}></span>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
  const modal = ReactDOM.createPortal(contents, modalRoot);
  return modal;
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  closeCallback: PropTypes.func,
};

export default Modal;
