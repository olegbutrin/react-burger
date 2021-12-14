import PropTypes from "prop-types";

import css from "../modal-contents.module.css";

const ContentsOrder = (props: { orderID: string }) => {
  return (
    <div className={css.contents}>
      <p className="text text_type_digits-large mt-10 mr-8 ml-8">
        {props.orderID}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={css.orderAnimation + " mt-15"}></div>
      <p className="text text_type_main-small mt-15">
        ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

ContentsOrder.propTypes = {
  orderID: PropTypes.string.isRequired,
};

export default ContentsOrder;
