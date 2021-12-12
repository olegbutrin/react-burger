import PropTypes from "prop-types";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "../modal-contents.module.css";

// модальное окно для предупреждения о пустом бургере
const ContentsEmpty = (props: { closeCallback: (...args: any[]) => void }) => {
  return (
    <div className={css.contents}>
      <p className="text text_type_main-medium mt-20 mb-12">
        Закажите хотя бы соус!
      </p>
      <div className="mt-8">
        <Button type="primary" size="medium" onClick={props.closeCallback}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

ContentsEmpty.propTypes = {
  closeCallback: PropTypes.func.isRequired,
};

export default ContentsEmpty;
