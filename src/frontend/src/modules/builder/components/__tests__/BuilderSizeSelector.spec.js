import { SET_ENTITY } from "@/store/mutations-types";
import { pizza, sizes } from "@/common/mocks/pizza";
import { generateMockStore } from "@/store/mocks";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderSizeSelector from "../BuilderSizeSelector";
import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("SelectorItem", SelectorItem);
localVue.component("RadioButton", RadioButton);

const initiateStore = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      value: {
        pizza,
        sizes,
      },
    },
    { root: true }
  );
};

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setOption: jest.fn(),
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

  it("render all components from sizes", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    expect(Array.from(wrapper.findAll(".diameter__input")).length).toBe(
      store.state.Builder.sizes.length
    );
  });

  it("render SelectorItem components", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    expect(Array.from(wrapper.findAllComponents(SelectorItem)).length).toBe(
      store.state.Builder.sizes.length
    );
  });

  it("sets correct data for SelectorItem components", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const selectorItems = wrapper.findAllComponents(SelectorItem);
    const testItems = store.state.Builder.sizes;
    for (let i = 0; i < testItems.length; i++) {
      const selectorProps = selectorItems.wrappers[i].props();
      expect(selectorProps.description).toBe(testItems[i].name);
      expect(selectorProps.transferData).toEqual({
        option: "size",
        value: testItems[i],
      });
    }
  });

  it("render RadioButton components", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    expect(Array.from(wrapper.findAllComponents(RadioButton)).length).toBe(
      store.state.Builder.sizes.length
    );
  });

  it("sets correct data for RadioButton components", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const radioButtons = wrapper.findAllComponents(RadioButton);
    const testItems = store.state.Builder.sizes;
    for (let i = 0; i < testItems.length; i++) {
      const radioProps = radioButtons.wrappers[i].props();
      expect(radioProps.value).toEqual(testItems[i]);
      expect(radioProps.checked).toBe(
        testItems[i].type === store.state.Builder.pizza.size.type
      );
    }
  });
});
