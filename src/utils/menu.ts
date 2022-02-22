import { IMenuItem } from "./types";

const mainMenu: IMenuItem[] = [
  {
    id: 1,
    value: "Конструктор",
    icon: "burger",
    route: "/",
  },
  {
    id: 2,
    value: "Лента заказов",
    icon: "list",
    route: "/feed",
  },
  {
    id: 3,
    value: "Личный кабинет",
    icon: "profile",
    route: "/profile",
  },
];

export default mainMenu;
