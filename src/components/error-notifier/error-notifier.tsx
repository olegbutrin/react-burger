import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "../order-details/order-details.module.css";

const ErrorNotifier: React.FC<{
  source?: string;
  message: string;
}> = ({ source, message }) => {
  return (
    <div className={css.contents + " mt-10"}>
      <div className="mt-2 mb-6">
        <InfoIcon type="error" />
      </div>
      {source && (
        <p className="text text_type_main-default text_color_inactive">
          {source}
        </p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-2">
        {message}
      </p>
    </div>
  );
};

export default ErrorNotifier;
