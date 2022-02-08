import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "../order-details/order-details.module.css";

const ErrorNotifier: (props: {
  source?: string;
  message: string;
}) => JSX.Element = (props) => {
  return (
    <div className={css.contents + " mt-10"}>
      <div className="mt-2 mb-6">
        <InfoIcon type="error" />
      </div>
      {props.source && (
        <p className="text text_type_main-default text_color_inactive">
          {props.source}
        </p>
      )}
      <p className="text text_type_main-default text_color_inactive mt-2">
        {props.message}
      </p>
    </div>
  );
};

export default ErrorNotifier;
