import {
  SET_ENTITY,
  CHANGE_INGREDIENT,
  CHANGE_OPTION,
} from "@/store/mutations-types";
import {
  doughType,
  ingredientTypes,
  sauceTypes,
  sizeTypes,
} from "@/common/constants";
import { getSum } from "@/common/helpers";

const module = "Builder";
const initialPizza = (doughValue, sauceValue, sizeValue) => {
  return {
    name: "",
    dough: { ...doughValue },
    ingredients: [],
    sauce: { ...sauceValue },
    size: { ...sizeValue },
  };
};

export default {
  namespaced: true,
  state: {
    name: "",
    dough: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    pizza: {
      dough: {},
      ingredients: [],
      sauce: {},
      size: {},
    },
  },
  getters: {
    getIngredient: (state) => (type) => {
      let currentIngredient = state.pizza.ingredients.find((ingredient) => {
        return ingredient.type === type;
      });
      if (!currentIngredient) {
        currentIngredient = state.ingredients.find((ingredient) => {
          return ingredient.type === type;
        });
      }
      return {
        count: 0,
        ...currentIngredient,
      };
    },
    sum: (state) => {
      return getSum(state.pizza);
    },
  },
  actions: {
    async query({ commit }) {
      let data = await this.$api.dough.query();
      const dough = data.map((doughItem) => {
        return {
          ...doughItem,
          type: doughType[doughItem.name],
        };
      });
      data = await this.$api.ingredients.query();
      const ingredients = data.map((ingredient) => {
        return {
          ...ingredient,
          type: ingredientTypes[ingredient.name],
          maxCount: 3,
        };
      });
      data = await this.$api.sauces.query();
      const sauces = data.map((sauce) => {
        return {
          ...sauce,
          type: sauceTypes[sauce.name],
        };
      });
      data = await this.$api.sizes.query();
      const sizes = data.map((size) => {
        return {
          ...size,
          type: sizeTypes[size.multiplier],
        };
      });
      commit(
        SET_ENTITY,
        {
          module,
          value: {
            dough,
            ingredients,
            sauces,
            sizes,
          },
        },
        { root: true }
      );
    },
    resetPizza({ state, commit }) {
      const pizza = initialPizza(
        state.dough[0],
        state.sauces[0],
        state.sizes[1]
      );
      commit(
        SET_ENTITY,
        {
          module,
          value: { pizza },
        },
        { root: true }
      );
    },
    setPizza({ commit }, pizza) {
      commit(
        SET_ENTITY,
        {
          module,
          value: { pizza },
        },
        { root: true }
      );
    },
    addIngredient({ commit }, ingredient) {
      commit(
        CHANGE_INGREDIENT,
        {
          module,
          entity: "pizza",
          value: { ...ingredient },
        },
        { root: true }
      );
    },
    setOption({ commit }, { option, value }) {
      commit(
        CHANGE_OPTION,
        {
          module,
          entity: "pizza",
          value: {
            [option]: { ...value },
          },
        },
        { root: true }
      );
    },
    setName({ commit }, name) {
      commit(
        CHANGE_OPTION,
        {
          module,
          entity: "pizza",
          value: {
            name,
          },
        },
        { root: true }
      );
    },
  },
};
