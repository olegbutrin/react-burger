import type { Middleware, MiddlewareAPI } from "redux";
import type {
  AppDispatch,
  IIngredientData,
  RootState,
  TApplicationActions,
  TFeedServerMessage,
  TFeedTicket,
  TFeedTicketMessage,
  TFeedType,
  TWSMiddlewareActions,
} from "../../utils/types";

import { WS_URL } from "../../utils/defaults";

import { getUserAccessToken } from "../user";
import { updateTokens } from "../actions/auth";

const getWSUrl = (type: TFeedType) => {
  switch (type) {
    case "all":
      return `${WS_URL}/orders/all`;
    case "user":
      let token = getUserAccessToken();
      token = token.split(" ")[1];
      return `${WS_URL}/orders?token=${token}`;
  }
};

const convertOrdersToTickets: (
  data: TFeedServerMessage,
  ingredients: IIngredientData[]
) => TFeedTicketMessage = (data, ingredients) => {
  const message: TFeedTicketMessage = {
    success: data.success,
    tickets: [],
    total: data.total,
    totalToday: data.totalToday,
  };
  if (data && data.orders) {
    data.orders.forEach((order) => {
      // Фильтруем и пытаемся рассортировать ингредиенты так,
      // чтобы id булки был в одном экземпляре и располагался на последнем месте в массиве.
      // Такое поведение нужно потому, что общий список заказов содержит разные составы ингредиентов,
      // в зависимости от того, как разные студенты ренализовали отправку заказа.
      const bun = order.ingredients.find((id) => {
        const ingredient = ingredients.find((ingredient) => {
          return ingredient._id === id;
        });
        if (ingredient && ingredient.type === "bun") {
          return true;
        } else {
          return false;
        }
      });
      const ingrs = order.ingredients.filter((item) => {
        return item !== bun;
      });
      const ticket: TFeedTicket = {
        name: order.name,
        status: order.status,
        number: order.number,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        ingredients: ingrs && bun ? [...ingrs, bun] : order.ingredients,
        names: new Map(),
        icons: new Map(),
        prices: new Map(),
        price: 0,
        _id: order._id,
      };
      order.ingredients.forEach((id) => {
        const ingredient = ingredients.find((item) => {
          return item._id === id;
        });
        if (ingredient) {
          ticket.names.set(id, ingredient.name);
          ticket.icons.set(id, ingredient.image_mobile);
          ticket.prices.set(id, ingredient.price);
          if (ingredient.type === "bun") {
            ticket.price += ingredient.price * 2;
          } else {
            ticket.price += ingredient.price;
          }
        } else {
          ticket.names.set(id, "");
          ticket.icons.set(id, "");
        }
      });
      message.tickets.push(ticket);
    });
  }

  message.tickets.sort((t1, t2) => {
    return new Date(t1.updatedAt).getTime() - new Date(t2.updatedAt).getTime();
  });
  message.tickets.reverse();
  return message;
};

export const socketMiddleware = (
  wsActions: TWSMiddlewareActions
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    // define socket
    let socket: WebSocket | null = null;
    return (next) => (action: TApplicationActions) => {
      //
      const {
        onInit,
        onConnect,
        onRefuse,
        onOpen,
        onMessage,
        onError,
        onClose,
        onClosed,
        onSend,
      } = wsActions;

      // start process actions
      if (action.type === onInit || action.type === onRefuse) {
        const { dispatch, getState } = store;
        const { feed } = getState();
        const url = getWSUrl(feed.type);

        // инициализация сокета в зависимости от типа (просматриваемой страницы)
        // и соединение с сервером
        socket = new WebSocket(url);

        if (socket) {
          // on open
          dispatch({ type: onConnect });

          socket.onopen = () => {
            dispatch({ type: onOpen });
          };

          // on error
          socket.onerror = (event) => {
            dispatch({
              type: onError,
              payload: {
                source: "WebSocket Connection",
                message: event.type,
              },
            });
          };

          // on message
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData: TFeedServerMessage = JSON.parse(data);
            if (parsedData.success) {
              const { list } = getState();
              const ingredients = list.ingredients;
              dispatch({
                type: onMessage,
                payload: convertOrdersToTickets(parsedData, ingredients),
              });
            } else {
              updateTokens().then((result) => {
                if (result) {
                  dispatch({ type: onRefuse });
                } else {
                  dispatch({
                    type: onError,
                    payload: {
                      source: "WebSocket Connection",
                      message: "Server refused access token!",
                    },
                  });
                }
              });
            }
          };

          // on close
          socket.onclose = (event) => {
            dispatch({ type: onClosed, payload: event });
          };
        }
      } else if (action.type === onSend) {
        if (socket) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      } else if (action.type === onClose) {
        if (socket) {
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
};
