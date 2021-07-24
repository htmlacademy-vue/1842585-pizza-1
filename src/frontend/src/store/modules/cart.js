import { cloneDeep, uniqueId } from "lodash";

import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import misc from "@/static/misc.json";
import { getSum } from "@/common/helpers";

const module = "Cart";
const initialCart = () => {
  const additional = misc.map((miscItem) => {
    const newMisc = cloneDeep(miscItem);
    newMisc.count = 0;
    newMisc.id = uniqueId();
    return newMisc;
  });
  return {
    reciveType: 1,
    tel: "",
    street: "",
    house: "",
    apartment: "",
    pizzas: [],
    additional,
  };
};

export default {
  namespaced: true,
  getters: {
    sum: (state) => {
      let sum = 0;
      sum = state.pizzas.reduce((prevSum, pizza) => {
        return prevSum + getSum(pizza);
      }, sum);
      sum = state.additional.reduce((prevSum, addItem) => {
        return prevSum + addItem.price * addItem.count;
      }, sum);
      return sum;
    },
    pizzaSum: () => (pizza) => {
      return getSum(pizza);
    },
  },
  actions: {
    query({ commit }) {
      commit(
        SET_ENTITY,
        {
          module,
          value: initialCart(),
        },
        { root: true }
      );
    },
    addPizza({ commit }, pizza) {
      const data = cloneDeep(pizza);
      commit(
        ADD_ENTITY,
        {
          module,
          entity: "pizzas",
          value: data,
        },
        { root: true }
      );
    },
    updatePizza({ commit }, pizza) {
      const data = cloneDeep(pizza);
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "pizzas",
          value: data,
        },
        { root: true }
      );
    },
    deletePizza({ commit }, pizzaId) {
      commit(
        DELETE_ENTITY,
        {
          module,
          entity: "pizzas",
          id: pizzaId,
        },
        { root: true }
      );
    },
    updateAdditional({ commit }, addItem) {
      const data = cloneDeep(addItem);
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity: "additional",
          value: data,
        },
        { root: true }
      );
    },
    setOption({ commit }, option) {
      console.log(option);
      commit(
        SET_ENTITY,
        {
          module,
          value: {
            [option.name]: option.value,
          },
        },
        { root: true }
      );
    },
  },
};
