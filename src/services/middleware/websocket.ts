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

const getWSUrl = (type: TFeedType) => {
  switch (type) {
    case "all":
      return `${WS_URL}/orders/all`;
    case "user":
      let token = getUserAccessToken();
      console.log(token);
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
  data.orders.forEach((order) => {
    const ticket: TFeedTicket = {
      name: order.name,
      status: order.status,
      number: order.number,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      ingredients: order.ingredients,
      names: new Map(),
      icons: new Map(),
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

  message.tickets.sort((t1, t2) => {
    return new Date(t1.createdAt).getTime() - new Date(t2.createdAt).getTime();
  });
  message.tickets.reverse();
  console.log(message);
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
      const { onInit, onOpen, onMessage, onError, onClose, onClosed, onSend } =
        wsActions;

      // start process actions
      if (action.type === onInit) {
        const { dispatch, getState } = store;
        const { feed } = getState();
        const url = getWSUrl(feed.type);

        // инициализация сокета в зависимости от типа (просматриваемой страницы)
        // и соединение с сервером
        socket = new WebSocket(url);

        if (socket) {
          // on open
          socket.onopen = () => {
            console.log("Socket connected");
            dispatch({ type: onOpen });
          };

          // on error
          socket.onerror = (event) => {
            dispatch({
              type: onError,
              payload: { source: "WebSocket Connection", message: event.type },
            });
          };

          // on message
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData: TFeedServerMessage = JSON.parse(data);
            console.log("Socket receive data:");
            console.log(parsedData);
            const { list } = getState();
            const ingredients = list.ingredients;
            dispatch({
              type: onMessage,
              payload: convertOrdersToTickets(parsedData, ingredients),
            });
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
          console.log("Socket closed");
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
};
