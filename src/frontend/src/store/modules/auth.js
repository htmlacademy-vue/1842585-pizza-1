import {
  SET_ENTITY,
  SET_BOOLEAN,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

const module = "Auth";

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthenticated: false,
    addresses: [],
  },
  actions: {
    async query({ dispatch }) {
      await dispatch("fetchUsers");
    },
    async getAddresses({ commit }) {
      const addresses = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          module,
          value: { addresses },
        },
        { root: true }
      );
    },
    async addAddress({ commit }, address) {
      if (address.id) {
        await this.$api.addresses.put(address);
        commit(
          UPDATE_ENTITY,
          {
            module,
            entity: "addresses",
            value: address,
          },
          { root: true }
        );
      } else {
        const data = await this.$api.addresses.post(address);
        commit(
          ADD_ENTITY,
          {
            module,
            entity: "addresses",
            value: data,
          },
          { root: true }
        );
      }
    },
    async deleteAddress({ commit }, addressId) {
      if (addressId) {
        await this.$api.addresses.delete(addressId);
        commit(
          DELETE_ENTITY,
          {
            module,
            entity: "addresses",
            id: addressId,
          },
          { root: true }
        );
      }
    },
    async fetchUsers({ commit }) {
      const user = await this.$api.auth.getMe();
      commit(
        SET_ENTITY,
        {
          module,
          value: { user },
        },
        { root: true }
      );
    },
    async login({ state }, value) {
      if (!state.isAuthenticated) {
        const data = await this.$api.auth.login(value);
        this.$jwt.saveToken(data.token);
      }
    },
    async logout({ commit }) {
      this.$jwt.destroyToken();
      commit(
        SET_ENTITY,
        {
          module,
          value: { user: null },
        },
        { root: true }
      );
      commit(
        SET_BOOLEAN,
        {
          module,
          entity: "isAuthenticated",
          value: false,
        },
        { root: true }
      );
    },
  },
};
