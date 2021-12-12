import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import css from "./modal.module.css";

// модальное окно через портал
const Modal = (props: {
  element: any;
  children: any;
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
  const modal = ReactDOM.createPortal(contents, props.element);
  return modal;
};

Modal.propTypes = {
  element: PropTypes.any,
  children: PropTypes.any,
  closeCallback: PropTypes.func,
};

export default Modal;
