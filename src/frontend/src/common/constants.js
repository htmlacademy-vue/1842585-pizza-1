export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";
export const MESSAGE_LIVE_TIME = 3 * 1000;
export const INPUT_TEXT_TIME = 200;
export const doughType = {
  Тонкое: "light",
  Толстое: "large",
};
export const ingredientTypes = {
  Грибы: "mushrooms",
  Чеддер: "cheddar",
  Салями: "salami",
  Ветчина: "ham",
  Ананас: "ananas",
  Бекон: "bacon",
  Лук: "onion",
  Чили: "chile",
  Халапеньо: "jalapeno",
  Маслины: "olives",
  Томаты: "tomatoes",
  Лосось: "salmon",
  Моцарелла: "mozzarella",
  Пармезан: "parmesan",
  "Блю чиз": "blue_cheese",
};
export const sauceTypes = {
  Томатный: "tomato",
  Сливочный: "creamy",
};
export const sizeTypes = {
  1: "small",
  2: "normal",
  3: "big",
};
export const reciveTypes = [
  {
    value: 1,
    name: "Заберу сам",
  },
  {
    value: 2,
    name: "Новый адрес",
  },
  {
    value: 3,
    name: "Дом",
  },
];
export const resources = {
  AUTH: "auth",
  ADDRESSES: "addresses",
  ORDERS: "orders",
  DOUGH: "dough",
  INGREDIENTS: "ingredients",
  MISC: "misc",
  SAUCES: "sauces",
  SIZES: "sizes",
};
export const notificationTypes = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */
