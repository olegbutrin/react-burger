import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./withPopup.module.css";

const withPopup =
  (props: any) => (WrappedComponent: any, closeCallback: () => void) => {
    return class extends React.Component {
      render() {
        return WrappedComponent ? (
          <div className={css.background}>
            <div className={css.container}>
              <div className={css.closeButton} onClick={closeCallback}>
                <CloseIcon type="primary" />
              </div>
              <WrappedComponent data={props} />
            </div>
          </div>
        ) : (
          ""
        );
      }
    };
  };

export default withPopup;
