import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedTicket, TFeedType } from "../../utils/types";

import { formatDate, formatStatus } from "../../utils/helpers";

import css from "./ticket.module.css";

// Отдельный компонент для иконки в ряду
// Позиционирование решено через использование position absolute
// и дополнительного свойства left, которое указывается в свойстве style элемента

const ItemPreview: React.FC<{
  name?: string;
  icon?: string;
  text?: string;
  position: number;
}> = ({ name, icon, text, position }) => {
  return (
    <div
      className={css.icon}
      title={name}
      style={{ left: 52 * position + "px" }}
    >
      <div
        className={css.iconBackground}
        style={{
          backgroundImage: `url("${icon}")`,
        }}
      >
        {text && (
          <span className={css.counter + " text text_type_digits-default"}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

const Ticket: React.FC<{ ticketData: TFeedTicket; tickedType: TFeedType }> = ({
  ticketData,
  tickedType,
}) => {
  // calculate values
  const formattedDate = formatDate(ticketData.createdAt);
  const { statusText, statusStyle } = formatStatus(ticketData.status, css);
  const ticketItems = ticketData.ingredients.slice(-6);

  return (
    <div className={css.ticket}>
      <div className={css.fullRow}>
        <span
          className={"text text_type_digits-default"}
        >{`#${ticketData.number}`}</span>
        <span className={"text text_type_main-default text_color_inactive"}>
          {formattedDate}
        </span>
      </div>
      <div className={css.fullRow + " mt-6"}>
        <span className={"text text_type_main-medium"}>{ticketData.name}</span>
      </div>
      {tickedType === "user" && (
        <div className={css.fullRow + " mt-2"}>
          <span className={"text text_type_main-default " + statusStyle}>
            {statusText}
          </span>
        </div>
      )}
      <div className={css.fullRow + " mt-6"}>
        <div className={css.itemContainer}>
          {ticketItems.map((item, index) => {
            return (
              <ItemPreview
                key={index}
                name={ticketData.names.get(item)}
                icon={ticketData.icons.get(item)}
                text={
                  index === 0 &&
                  ticketItems.length < ticketData.ingredients.length
                    ? "+" + (ticketData.ingredients.length - ticketItems.length)
                    : ""
                }
                position={ticketItems.length - (index + 1)}
              />
            );
          })}
        </div>
        <div className={css.priceContainer}>
          <span className={"text text_type_digits-default"}>
            {ticketData.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
