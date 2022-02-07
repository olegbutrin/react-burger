import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "../order-details/order-details.module.css";

const OrderError = () => {
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

export default OrderError;
