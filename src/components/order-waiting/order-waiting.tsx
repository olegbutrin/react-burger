
import css from "./order-waiting.module.css";

export const OrderWaiting = () => {
  return <div className={css.contents}>
    <p className="text text_type_main-medium mt-10 mr-8 ml-8 mb-10">
        Ожидаем регистрации заказа...
      </p>
  </div>
}