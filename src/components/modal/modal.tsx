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
  const contents = (
    <ModalOverlay closeCallback={props.closeCallback}>
      <div className={css.container}>
        <div className={css.closeButton} onClick={props.closeCallback}>
          <CloseIcon type="primary" />
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
