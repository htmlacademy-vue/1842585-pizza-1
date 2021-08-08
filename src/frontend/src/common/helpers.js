import { resources } from "@/common/constants";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
  OrdersApiService,
} from "@/services/api.service";
import { SET_BOOLEAN } from "@/store/mutations-types";

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
export const getSum = (object) => {
  const options = Object.keys(object);
  let sum = 0,
    multiplier = 0,
    itemSum = 0,
    count = null;
  options.forEach((key) => {
    const option = object[key];
    if (option instanceof Array) {
      itemSum = option.reduce((prevSum, item) => {
        return (prevSum += item.count * item.price);
      }, itemSum);
    } else if (option && option.price) {
      sum += option.price;
    } else if (option && option.multiplier) {
      multiplier = option.multiplier;
    } else if (key === "count") {
      count = option;
    }
  });
  sum = itemSum ? (sum + itemSum) * multiplier : 0;
  sum = count === null ? sum : sum * count;
  return sum;
};
export const getItem = (itemArray, id) => {
  return itemArray.find((item) => item.id === id);
};
export const getIngredientDescr = (ingredients) => {
  return ingredients.reduce((prevDecr, ingredient) => {
    return `${prevDecr}${
      prevDecr === "" ? "" : ", "
    } ${ingredient.name.toLowerCase()}`;
  }, "");
};
export const getAddressDescr = (address) => {
  return `${address.street}, д. ${address.building}, оф. ${address.flat}`;
};
export const getTypeDescr = (type) => {
  return type === "light" ? "на тонком тесте." : "на толстом тесте.";
};
export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/fetchUsers");
  store.commit(SET_BOOLEAN, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};
export const createResources = (notifier) => {
  return {
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ORDERS]: new OrdersApiService(notifier),
  };
};
