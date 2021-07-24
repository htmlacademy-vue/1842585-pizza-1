import { uniqueId } from "lodash";
import Vue from "vue";
import Vuex from "vuex";

import modules from "@/store/modules";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  CHANGE_INGREDIENT,
  CHANGE_OPTION,
} from "@/store/mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

Vue.use(Vuex);

const state = () => ({
  notifications: [],
});

const mutations = {
  [ADD_NOTIFICATION](state, notification) {
    state.notifications = [...state.notifications, notification];
  },
  [DELETE_NOTIFICATION](state, id) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== id
    );
  },
  [CHANGE_INGREDIENT](state, { module, entity, value }) {
    let ingredients = null;
    if (module) {
      ingredients = state[module][entity].ingredients;
    } else {
      ingredients = state[entity].ingredients;
    }
    const index = ingredients.findIndex(({ name }) => name === value.name);
    if (~index) {
      if (value.count) {
        ingredients.splice(index, 1, value);
      } else {
        ingredients.splice(index, 1);
      }
    } else {
      ingredients.push(value);
    }
  },
  [CHANGE_OPTION](state, { module, entity, value }) {
    module
      ? (state[module][entity] = { ...state[module][entity], ...value })
      : (state[entity] = { ...state[entity], ...value });
  },
  [SET_ENTITY](state, { module, value }) {
    module
      ? (state[module] = { ...state[module], ...value })
      : (state = { ...state, ...value });
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    const el = { ...value, id: uniqueId() };
    if (module) {
      state[module][entity].push(el);
    } else {
      state[entity].push(el);
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, { ...value });
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter((e) => e.id !== id);
    } else {
      state[entity] = state[entity].filter((e) => e.id !== id);
    }
  },
};

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
    dispatch("Builder/resetPizza");
    dispatch("Cart/query");
  },
  async createNotification({ commit }, { ...notification }) {
    const uniqueNotification = {
      ...notification,
      id: uniqueId(),
    };

    commit(ADD_NOTIFICATION, uniqueNotification);

    setTimeout(
      () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
