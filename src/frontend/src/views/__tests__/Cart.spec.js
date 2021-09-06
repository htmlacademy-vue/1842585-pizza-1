import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import ItemCounter from "@/common/components/ItemCounter";
import {additional, pizzas} from "@/common/mocks/cart";
import {user} from "@/common/mocks/user";
import Cart from "../Cart";
import AppInput from "@/common/components/AppInput";
import AppModal from "@/common/components/AppModal";
import $validator from "@/common/validator";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppModal", AppModal);
localVue.component("ItemCounter", ItemCounter);
localVue.component("AppInput", AppInput);

const initialStore = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      value: {
        user,
        isAuthenticated: true,
      },
    },
    { root: true }
  );
  store.commit(
    SET_ENTITY,
    {
      module: "Cart",
      value: {
        additional,
        pizzas,
      },
    },
    { root: true }
  );
};

describe("Cart", () => {
  let store;
  let wrapper;
  let actions;

  const mocks = {
    $router: {
      push: jest.fn()
    },
    $notifier: {
      info: jest.fn()
    },
    $validator
  };

  const stubs = [
    'router-link'
  ];

  const createComponent = (options) => {
    wrapper = mount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        updatePizza: jest.fn(),
        updateAdditional: jest.fn(),
        setOption: jest.fn(),
        createOrder: jest.fn(),
      },
      Builder: {
        setPizza: jest.fn(),
      },
    }
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({localVue, store, mocks});
    expect(wrapper.exists()).toBeTruthy();
  });

  it("doesn't fill pizzas", () => {
    createComponent({localVue, store, mocks});
    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
  });

  it("render pizza items", () => {
    initialStore(store);
    createComponent({localVue, store, mocks, stubs});
    expect(Array.from(wrapper.findAll(".cart-list__item")).length).toBe(pizzas.length);
  });

  it("clicks edit button", async () => {
    initialStore(store);
    createComponent({localVue, store, mocks, stubs});
    const buttons = wrapper.findAll(".cart-list__edit");
    for (let i = 0; i < pizzas.length; i++) {
      await buttons.wrappers[i].trigger("click");
      expect(actions.Builder.setPizza).toHaveBeenCalled();
      expect(mocks.$router.push).toHaveBeenCalledWith("/");
    };
  });

  it("doesn't open popup", () => {
    initialStore(store);
    createComponent({localVue, store, mocks, stubs});
    const popupProps = wrapper.findComponent(AppModal).props();
    expect(popupProps.popupOpen).toBeFalsy();
  });

  it("open popup then order was sent", async () => {
    initialStore(store);
    createComponent({localVue, store, mocks, stubs, });
    await wrapper.setData({ address: {
      name: "Новый адрес",
        street: "Новая улица",
        building: "15",
        flat: "64",
    }});
    const submitButton = wrapper.find(".footer__submit > button");
    await submitButton.trigger("click");
    expect(actions.Cart.createOrder).toHaveBeenCalled();
    const popupProps = wrapper.findComponent(AppModal).props();
    expect(popupProps.popupOpen).toBeTruthy();
  });

});
