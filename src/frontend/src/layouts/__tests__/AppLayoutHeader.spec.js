import {createLocalVue, mount} from "@vue/test-utils";
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import AppLayoutHeader from "../AppLayoutHeader";
import user from '@/static/user';
import {SET_BOOLEAN, SET_ENTITY} from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const login = store => {
  store.commit(
    SET_BOOLEAN,
    {
      module: "Auth",
      entity: "isAuthenticated",
      value: true,
    }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      value: { user },
    }
  );
};

describe("AppLayoutHeader", () => {
  let wrapper;
  let actions;
  let store;
  const stubs = ['router-link'];
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };
  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  it("is rendered", () => {
    createComponent({localVue, store, stubs});
    expect(wrapper.exists()).toBeTruthy();
  });

  it("header logo is rendered", () => {
    createComponent({localVue, store, stubs});
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
  });

  it("cart is rendered", () => {
    createComponent({localVue, store, stubs});
    expect(wrapper.find(".header__cart").exists()).toBeTruthy();
  });

  it("block user is rendered", () => {
    createComponent({localVue, store, stubs});
    expect(wrapper.find(".header__user").exists()).toBeTruthy();
  });

  it("is logout", async () => {
    login(store);
    createComponent({localVue, store, stubs});
    await wrapper.find(".header__logout").trigger("click");
    expect(actions.Auth.logout).toHaveBeenCalled();
  });
});
