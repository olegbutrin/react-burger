import PropTypes from "prop-types";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-empty.module.css";

const BurgerEmpty = (props) => {
  return (
    <div className={css.container}>
      {!props.missingBun && (
        <>
          <div className={css.burger + " mb-10"}>
            <BurgerIcon type="primary"></BurgerIcon>
          </div>
          <p className="text text_type_main-medium text_color_inactive">
            перетащите сюда ингредиенты
          </p>
          <p className="text text_type_main-medium text_color_inactive">
            начните с булки
          </p>
        </>
      )}
      {props.missingBun && (
        <p className="text text_type_main-medium text_color_inactive mt-10">
          без булки все развалится!
        </p>
      )}
    </div>
  );
};

BurgerEmpty.propTypes = {
  missingBun: PropTypes.bool.isRequired,
};

export default BurgerEmpty;
