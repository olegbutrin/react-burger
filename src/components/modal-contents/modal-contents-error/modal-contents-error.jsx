import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { isPropertySignature } from "typescript";

import css from "../modal-contents.module.css";

const ErrorInfo = () => {
  return (
    <div className={css.contents}>
      <InfoIcon type="error" />
      <p className="text text_type_main-default text_color_inactive mt-10">
        ошибка загрузки данных!
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        обратитесь к администрации
      </p>
    </div>
  );
};


export default ErrorInfo;
