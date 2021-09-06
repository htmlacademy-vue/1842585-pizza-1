import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { dough, pizza } from "@/common/mocks/pizza";
import { CHANGE_OPTION } from "@/store/mutations-types";
import BuilderDoughSelector from "../BuilderDoughSelector";
import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("SelectorItem", SelectorItem);
localVue.component("RadioButton", RadioButton);

const initiateStore = (store) => {
  store.commit(CHANGE_OPTION, {
    module: "Builder",
    entity: "dough",
    value: dough,
  });
  store.commit(CHANGE_OPTION, {
    module: "Builder",
    entity: "pizza",
    value: pizza,
  });
};

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
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

  it("is render dough type blocks", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const doughlist = wrapper.findAll(".dough__input");
    expect(Array.from(doughlist).length).toBe(dough.length);
  });

  it("has correct class", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    dough.forEach((doughItem) => {
      expect(
        wrapper.find(`.dough__input--${doughItem.type}`).exists()
      ).toBeTruthy();
    });
  });

  it("is render SelectorItem", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const selectorItemList = wrapper.findAllComponents(SelectorItem);
    expect(Array.from(selectorItemList).length).toBe(dough.length);
  });

  it("filling correct data for SelectorItem", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const selectorItemList = wrapper.findAllComponents(SelectorItem);
    dough.forEach((doughItem, index) => {
      const selectorItemProps = selectorItemList.wrappers[index].props();
      expect(selectorItemProps.name).toBe(doughItem.name);
      expect(selectorItemProps.description).toBe(doughItem.description);
      expect(selectorItemProps.transferData).toEqual({
        option: "dough",
        value: doughItem,
      });
    });
  });

  it("is render RadioButton", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const radioButtonList = wrapper.findAllComponents(RadioButton);
    expect(Array.from(radioButtonList).length).toBe(dough.length);
  });

  it("filling correct data for RadioButton", () => {
    initiateStore(store);
    createComponent({ localVue, store });
    const radioList = wrapper.findAllComponents(RadioButton);
    dough.forEach((doughItem, index) => {
      const radioProps = radioList.wrappers[index].props();
      expect(radioProps.value).toEqual(doughItem);
      expect(radioProps.checked).toBe(doughItem.type === pizza.dough.type);
    });
  });
});
