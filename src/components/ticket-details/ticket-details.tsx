import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderInfo } from "../../services/actions/order";
import { formatDate, formatStatus } from "../../utils/helpers";
import { useDispatch, useSelector } from "../../utils/hooks";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./ticket-details.module.css";

type TOrderIngredientDetails = {
  name: string;
  icon: string;
  price: number;
  count: number;
};

const TicketDetails = () => {
  const { ingredients } = useSelector((store) => store.list);
  const { order, request } = useSelector((store) => store.details);

  const dispatch = useDispatch();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderInfo(id));
    }
  }, [id, dispatch]);

  const { statusText, statusStyle } = order
    ? formatStatus(order.status, css)
    : { statusText: "", statusStyle: "" };

  // Для списка ингредиентов заказа используем Map, потому, 
  // что это позволяет легко избавиться от дубликатов
  const orderIngredients: Map<string, TOrderIngredientDetails> = new Map();
  if (order) {
    order.ingredients.forEach((id) => {
      const product = ingredients.find((ingredient) => {
        return ingredient._id === id;
      });
      if (product) {
        if (orderIngredients.has(id)) {
          const item = orderIngredients.get(id);
          if (item) {
            item.count = item.count + 1;
            orderIngredients.set(id, item);
          }
        } else {
          orderIngredients.set(id, {
            name: product.name,
            price: product.price,
            icon: product.image_mobile,
            count: product.type === "bun" ? 2 : 1,
          });
        }
      }
    });
  }

  const formattedDate = order ? formatDate(order.createdAt) : "";
  const totalPrice = order
    ? [...orderIngredients.keys()].reduce((total, id) => {
        const item = orderIngredients.get(id);
        if (item) {
          return total + item.count * item.price;
        } else {
          return total;
        }
      }, 0)
    : 0;

  return (
    <div className={css.contents + " mt-6"}>
      {request && <div>Идет загрузка данных</div>}
      {!request && order && (
        <>
          <div className={css.ticketNumber + " mt-10"}>
            <span className={"text text_type_digits-default"}>{"#" + order.number}</span>
          </div>
          <div className={"mt-10"}>
            <span className={"text text_type_main-medium"}>{order.name}</span>
          </div>
          <div className={"mt-3"}>
            <span className={"text text_type_main-default " + statusStyle}>
              {statusText}
            </span>
          </div>
          <div className={"mt-15"}>
            <span className={"text text_type_main-medium"}>Состав:</span>
          </div>
          <div className={css.orderIngredients + " mt-6 custom-scroll"}>
            {[...orderIngredients.keys()].reverse().map((id, index) => {
              const item = orderIngredients.get(id);
              if (item) {
                return (
                  <div
                    className={css.fullRow + " mt-4"}
                    key={"Order_Ingrediend_Detail_" + (index + 1)}
                  >
                    <div className={css.iconContainer}>
                      <div className={css.icon}>
                        <div
                          className={css.iconBackground}
                          style={{
                            backgroundImage: `url("${item.icon}")`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <span
                      className={
                        css.itemName + " text text_type_main-default mr-4"
                      }
                    >
                      {item.name}
                    </span>
                    <div className={css.itemPrice}>
                      <span
                        className={
                          "text text_type_digits-default " + css.nobreak
                        }
                      >
                        {[item.count, item.price].join(" x ")}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
          <div className={css.fullRow + " mt-10"}>
            <span className={"text text_type_main-default text_color_inactive"}>
              {formattedDate}
            </span>
            <div className={css.itemPrice}>
              <span className={"text text_type_digits-default " + css.nobreak}>
                {totalPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketDetails;
