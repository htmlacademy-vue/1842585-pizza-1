import { cloneDeep, uniqueId } from "lodash";

import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import { getSum } from "@/common/helpers";

const module = "Cart";
const initialCart = (data) => {
  const additional = data.map((miscItem) => {
    const newMisc = cloneDeep(miscItem);
    newMisc.count = 0;
    return newMisc;
  });
  return {
    pizzas: [],
    additional,
  };
};

export default {
  namespaced: true,
  state: {
    pizzas: [],
    additional: [],
  },
  getters: {
    sum: (state) => {
      let sum = 0;
      sum = state?.pizzas?.reduce((prevSum, pizza) => {
        return prevSum + getSum(pizza);
      }, sum);
      sum = state?.additional?.reduce((prevSum, addItem) => {
        return prevSum + addItem.price * addItem.count;
      }, sum);
      return sum;
    },
    pizzaSum: () => (pizza) => {
      return getSum(pizza);
    },
  },
  actions: {
    async query({ commit }) {
      const misc = await this.$api.misc.query();
      commit(
        SET_ENTITY,
        {
          module,
          value: initialCart(misc),
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
          value: { ...data, id: uniqueId() },
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
    async createOrder({ dispatch }, order) {
      await this.$api.orders.post(order);
      dispatch("query");
    },
  },
};
