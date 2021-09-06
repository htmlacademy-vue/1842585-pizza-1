import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

import { ingredients, sauces, pizza } from "@/common/mocks/pizza";
import { SET_ENTITY } from "@/store/mutations-types";
import BuilderIngredientsSelector from "../BuilderIngredientsSelector";
import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("SelectorItem", SelectorItem);
localVue.component("RadioButton", RadioButton);
localVue.component("ItemCounter", ItemCounter);

const initiateSauce = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      value: {
        sauces,
        pizza,
      },
    },
    { root: true }
  );
};

const initiateIngredients = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Builder",
      value: {
        ingredients,
        pizza,
      },
    },
    { root: true }
  );
};

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
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

  it("is render sauce block", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".ingridients__sauce").exists).toBeTruthy();
  });

  it("is render sauce SelectorItem", () => {
    initiateSauce(store);
    createComponent({ localVue, store });
    const selectorItemList = wrapper.findAllComponents(SelectorItem);
    expect(Array.from(selectorItemList).length).toBe(sauces.length);
  });

  it("filling correct data for SelectorItem", () => {
    initiateSauce(store);
    createComponent({ localVue, store });
    const selectorList = wrapper.findAllComponents(SelectorItem);
    sauces.forEach((sauce, index) => {
      const selectorProps = selectorList.wrappers[index].props();
      expect(selectorProps.description).toBe(sauce.name);
      expect(selectorProps.transferData).toEqual({
        option: "sauce",
        value: sauce,
      });
    });
  });

  it("filling correct data for RadioButton", () => {
    initiateSauce(store);
    createComponent({ localVue, store });
    const radioList = wrapper.findAllComponents(RadioButton);
    sauces.forEach((sauce, index) => {
      const radioProps = radioList.wrappers[index].props();
      expect(radioProps.checked).toBe(sauce.type === pizza.sauce.type);
      expect(radioProps.value).toEqual(sauce);
    });
  });

  it("is render ingridients block", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".ingridients__filling").exists).toBeTruthy();
  });

  it("is render ingredients SelectorItem", () => {
    initiateIngredients(store);
    createComponent({ localVue, store });
    const selectorItemList = wrapper.findAllComponents(SelectorItem);
    expect(Array.from(selectorItemList).length).toBe(ingredients.length);
  });

  it("filling correct data ingredients for SelectorItem", () => {
    initiateIngredients(store);
    createComponent({ localVue, store });
    const selectorList = wrapper.findAllComponents(SelectorItem);
    ingredients.forEach((ingredient, index) => {
      const selectorProps = selectorList.wrappers[index].props();
      expect(selectorProps.description).toBe(ingredient.name);
      expect(selectorProps.transferData).toEqual({ count: 0, ...ingredient });
    });
  });

  it("filling correct data ingredients for ItemCounter", () => {
    initiateIngredients(store);
    createComponent({ localVue, store });
    const counterList = wrapper.findAllComponents(ItemCounter);
    ingredients.forEach((ingredient, index) => {
      const counterProps = counterList.wrappers[index].props();
      expect(counterProps.item).toEqual({ count: 0, ...ingredient });
    });
  });
});
