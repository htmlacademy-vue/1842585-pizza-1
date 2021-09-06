import {dough, ingredients, sauces, sizes} from "./pizza";

export const additional = [
  {
    "name": "Cola-Cola 0,5 литра",
    "image": "/public/img/cola.svg",
    "price": 56
  },
  {
    "name": "Острый соус",
    "image": "/public/img/sauce.svg",
    "price": 10
  },
  {
    "name": "Картошка из печи",
    "image": "/public/img/potato.svg",
    "price": 170
  }
];

export const pizzas = [
  {
    id: 1,
    name: "Test pizza",
    dough: { ...dough[0] },
    ingredients: [
      {...ingredients[0], count: 1},
      {...ingredients[1], count: 2},
      {...ingredients[2], count: 3},
    ],
    sauce: { ...sauces[0] },
    size: { ...sizes[0] },
    count: 3,
  },
  {
    id: 2,
    name: "New pizza",
    dough: { ...dough[1] },
    ingredients: [
      {...ingredients[4], count: 2},
      {...ingredients[5], count: 1},
      {...ingredients[6], count: 3},
    ],
    sauce: { ...sauces[1] },
    size: { ...sizes[2] },
    count: 1,
  },
];
