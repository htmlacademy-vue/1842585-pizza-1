import { SET_ENTITY } from "@/store/mutations-types";
import { pizza } from "@/common/mocks/pizza";
import { generateMockStore } from "@/store/mocks";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderPriceCounter from "../BuilderPriceCounter";
import { getSum } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const initiateStore = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      value: {
        pizza,
      },
    },
    { root: true }
  );
};

describe("BuilderPriceCounter", () => {
  let store;
  let wrapper;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addPizza: jest.fn(),
        updatePizza: jest.fn(),
      },
      Builder: {
        resetPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("has correct sum", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    let elementSum = wrapper.find(".content__result > p");
    let testSum = getSum(store.state.Builder.pizza);
    expect(elementSum.element.innerHTML).toBe(`Итого: ${testSum} ₽`);
  });

  it("has disabled button if pizza isn't filling", () => {
    createComponent({ localVue, store });
    let button = wrapper.find(".button");
    expect(button.element.disabled).toBeTruthy();
  });

  it("has disabled button if pizza isn't filling", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    let button = wrapper.find(".button");
    expect(button.element.disabled).toBeTruthy();
  });

  it("click on button to add new pizza", async () => {
    initiateStore(store);
    createComponent({ localVue, store });
    await wrapper.find(".button").trigger("click");
    expect(actions.Cart.addPizza).toHaveBeenCalled();
    expect(actions.Builder.resetPizza).toHaveBeenCalled();
  });

  it("click on button to update pizza", async () => {
    initiateStore(store);
    store.state.Builder.pizza.id = 1;
    createComponent({ localVue, store });
    await wrapper.find(".button").trigger("click");
    expect(actions.Cart.updatePizza).toHaveBeenCalled();
    expect(actions.Builder.resetPizza).toHaveBeenCalled();
  });
});
