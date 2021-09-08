import { cloneDeep } from "lodash";
import { SET_ENTITY } from "@/store/mutations-types";
import { getItem, getSum } from "@/common/helpers";

const module = "Orders";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {
    sum: () => (order) => {
      let sum = 0;
      sum = order?.pizzas?.reduce((prevSum, pizza) => {
        return prevSum + getSum(pizza);
      }, sum);
      sum = order?.additional?.reduce((prevSum, addItem) => {
        return prevSum + addItem.price * addItem.count;
      }, sum);
      return sum;
    },
  },
  actions: {
    async query({ commit, rootState }) {
      const data = await this.$api.orders.query();
      const orders = data.map((order) => {
        return {
          id: order.id,
          pizzas: order.orderPizzas.map((pizza) => {
            return {
              id: pizza.id,
              name: pizza.name,
              sauce: getItem(rootState.Builder.sauces, pizza.sauceId),
              dough: getItem(rootState.Builder.dough, pizza.doughId),
              size: getItem(rootState.Builder.sizes, pizza.sizeId),
              count: pizza.quantity,
              ingredients: pizza.ingredients.map((ingredient) => {
                const item = getItem(
                  rootState.Builder.ingredients,
                  ingredient.ingredientId
                );
                return {
                  name: "",
                  ...item,
                  count: ingredient.quantity,
                };
              }),
            };
          }),
          additional: order.orderMisc
            ? order.orderMisc.map((misc) => {
                return {
                  ...getItem(rootState.Cart.additional, misc.miscId),
                  count: misc.quantity,
                };
              })
            : [],
          address: order.orderAddress,
        };
      });
      commit(
        SET_ENTITY,
        {
          module,
          value: { orders },
        },
        { root: true }
      );
    },
    async deleteOrder({ state, commit }, id) {
      await this.$api.orders.delete(id);
      const orders = state.orders.filter((order) => {
        return order.id !== id;
      });
      commit(
        SET_ENTITY,
        {
          module,
          value: { orders },
        },
        { root: true }
      );
    },
    repeatOrder({ commit, rootState }, order) {
      const data = cloneDeep(order);
      data.additional = rootState.Cart.additional.map((addItem) => {
        const currentItem = getItem(order.additional, addItem.id);
        return {
          ...addItem,
          count: currentItem ? currentItem.count : 0,
        };
      });
      commit(
        SET_ENTITY,
        {
          module: "Cart",
          value: data,
        },
        { root: true }
      );
    },
  },
};
