import { dough, ingredients, sauces, sizes } from "./pizza";

export const orders = [
  {
    id: 234,
    pizzas: [
      {
        id: 1,
        name: "Job pizza",
        dough: { ...dough[1] },
        ingredients: [
          { ...ingredients[3], count: 1 },
          { ...ingredients[1], count: 2 },
          { ...ingredients[2], count: 3 },
        ],
        sauce: { ...sauces[0] },
        size: { ...sizes[0] },
        count: 3,
      },
      {
        id: 2,
        name: "Green pizza",
        dough: { ...dough[1] },
        ingredients: [
          { ...ingredients[4], count: 2 },
          { ...ingredients[8], count: 1 },
          { ...ingredients[3], count: 3 },
        ],
        sauce: { ...sauces[1] },
        size: { ...sizes[1] },
        count: 1,
      },
    ],
    additional: [
      {
        name: "Cola-Cola 0,5 литра",
        image: "/public/img/cola.svg",
        price: 56,
        count: 1,
      },
      {
        name: "Острый соус",
        image: "/public/img/sauce.svg",
        price: 10,
        count: 2,
      },
      {
        name: "Картошка из печи",
        image: "/public/img/potato.svg",
        price: 170,
        count: 3,
      },
    ],
    address: {
      name: "Новый адрес",
      street: "Новая улица",
      building: "15",
      flat: "64",
    },
  },
];
