import PropTypes from "prop-types";
import css from "../modal-contents.module.css";

const ContentsOrder = (props) => {
  //
  return (
    <div className={css.contents}>
      <p className="text text_type_digits-large mt-10 mr-8 ml-8">
        {props.orderState.order.number}
      </p>
      <p className="text text_type_main-medium mt-4">идентификатор заказа</p>
      <p className="text text_type_main-small mt-10">{props.orderState.name}</p>
      {props.orderState.success && (
        <>
          <div className={css.orderAnimation + " mt-15"}></div>
          <p className="text text_type_main-small mt-15">
            ваш заказ начали готовить
          </p>
          <p className="text text_type_main-small text_color_inactive mt-2 mb-20">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

ContentsOrder.propTypes = {
  orderState: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.shape({
      order: PropTypes.string || PropTypes.number,
    }),
    success: PropTypes.bool,
  }),
};

export default ContentsOrder;
