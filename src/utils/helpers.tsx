// ФУНКЦИИ ДЛЯ КОМПОНЕНТОВ С ЗАКАЗАМИ

import { FeedStatus } from "./types";

// форматирование даты для людей
export const formatDate: (utcString: string) => string = (
  utcString: string
) => {
  const day = 1000 * 60 * 60 * 24;
  const date = new Date(utcString);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 1);
  if (date.getTime() > today.getTime()) {
    return ["Сегодня,", date.toLocaleTimeString()].join(" ");
  } else if (date.getTime() > today.getTime() - day) {
    return ["Вчера,", date.toLocaleTimeString()].join(" ");
  } else if (date.getTime() > today.getTime() - day * 2) {
    return ["Позавчера,", date.toLocaleTimeString()].join(" ");
  } else {
    return [date.toLocaleDateString(), date.toLocaleTimeString()].join(" ");
  }
};

export const formatStatus: (
  status: string,
  css: {
    readonly [key: string]: string;
  }
) => {
  statusText: string;
  statusStyle: string;
} = (status: string, css) => {
  switch (status) {
    case FeedStatus.CREATED:
      return { statusText: "Создан", statusStyle: "" };
    case FeedStatus.PENDING:
      return { statusText: "Готовится", statusStyle: "" };
    case FeedStatus.DONE:
      return { statusText: "Выполнен", statusStyle: css.done };
    case FeedStatus.CANCELLED:
      return { statusText: "Отменен", statusStyle: css.cancelled };
    default:
      return { statusText: "", statusStyle: "" };
  }
};
