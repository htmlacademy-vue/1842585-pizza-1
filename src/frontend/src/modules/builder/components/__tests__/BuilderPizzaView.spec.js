import { SET_ENTITY } from "@/store/mutations-types";
import { pizza } from "@/common/mocks/pizza";
import BuilderPizzaView from "../BuilderPizzaView";
import { generateMockStore } from "@/store/mocks";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

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

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("is render all ingredients from pizza", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    let ingredientItems = wrapper.findAll(".pizza__filling");
    let ingredientsTest = store.state.Builder.pizza.ingredients;
    let countItems = 0;
    for (let item of ingredientsTest) {
      countItems += item.count;
    }
    expect(Array.from(ingredientItems).length).toBe(countItems);
  });

  it("has correct class", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    let pizzaItem = store.state.Builder.pizza;
    let pizzaSize = pizzaItem.dough.type === "large" ? "big" : "small";
    let pizzaType = pizzaItem.sauce.type;
    let testComponent = wrapper.find(
      `.pizza--foundation--${pizzaSize}-${pizzaType}`
    );
    expect(testComponent.exists()).toBeTruthy();
  });
});
