import React from "react";
import css from "./modal-overlay.module.css";

import { TModalOverlayType } from "../../utils/types";

// оверлей для модального окна
const ModalOverlay = (props: TModalOverlayType) => {
  return (
    <div onClick={props.closeCallback} className={css.background}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;
