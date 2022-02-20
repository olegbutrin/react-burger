import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./burger-empty.module.css";

const BurgerEmpty: React.FC<{ missingBun: boolean }> = ({ missingBun }) => {
  return (
    <div className={css.container}>
      {!missingBun && (
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
      {missingBun && (
        <p className="text text_type_main-medium text_color_inactive mt-10">
          без булки все развалится!
        </p>
      )}
    </div>
  );
};

export default BurgerEmpty;
