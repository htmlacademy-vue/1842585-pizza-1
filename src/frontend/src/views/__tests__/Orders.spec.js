import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import Orders from "../Orders";
import {orders} from "@/common/mocks/orders";

const localVue = createLocalVue();
localVue.use(Vuex);

const initialStore = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Orders",
      value: {
        orders,
      },
    },
    { root: true }
  );
};

describe("Orders", () => {
  let store;
  let wrapper;
  let deleteOrder;
  let repeatOrder;
  let routerPush;
  let mocks;

  const createElement = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    deleteOrder = jest.fn();
    repeatOrder = jest.fn();
    routerPush = jest.fn();
    mocks = {
      $router: {
        push: routerPush,
      },
    };
    const actions = {
      Orders: {
        query: jest.fn(),
        deleteOrder,
        repeatOrder
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createElement({localVue, store, mocks});
    expect(wrapper.exists()).toBeTruthy();
  });

  it("delete order correctly", async () => {
    initialStore(store);
    createElement({localVue, store, mocks});
    await wrapper.find("[data-test='delete-button'").trigger("click");
    expect(deleteOrder).toHaveBeenCalled();
  });

  it("repeat order correctly", async () => {
    initialStore(store);
    createElement({localVue, store, mocks});
    await wrapper.find("[data-test='repeat-button'").trigger("click");
    expect(repeatOrder).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith("/cart");
  });

})
