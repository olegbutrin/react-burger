import React, { MutableRefObject, UIEvent } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay/modal-overlay";

import css from "./modal.module.css";

import { TModalWindowType } from "../../utils/types";

const modalRoot:HTMLElement = document.getElementById("react-modals") || document.body;

// модальное окно через портал
const Modal = (props:TModalWindowType) => {
  const closeCallback = props.closeCallback;

  const closeModal = (e:UIEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    props.closeCallback();
  };

  const stopEvent = (e:React.UIEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const spanRef: MutableRefObject<any> = React.useRef(null);

  React.useEffect(() => {
    if (spanRef != null && spanRef.current) {
      spanRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    // escape press
    const handleEscape = (e:KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeCallback();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeCallback]);

  const contents = (
    <ModalOverlay closeCallback={closeModal}>
      <div tabIndex={0} className={css.container} onClick={stopEvent}>
        <div className={css.closeButton} onClick={closeModal} ref={spanRef}>
          <CloseIcon type="primary" />
        </div>
        {props.header && (
          <>
            <p
              className="text text_type_main-large mt-10"
              style={{ textAlign: "left" }}
            >
              {props.header}
            </p>
          </>
        )}
        {props.children}
      </div>
    </ModalOverlay>
  );
  return ReactDOM.createPortal(contents, modalRoot);
};

export default Modal;
