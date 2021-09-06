import {shallowMount} from "@vue/test-utils";
import SelectorItem from "../SelectorItem";

describe("Selector item", () => {
  const propsData = {
    name: "Test",
    description: "Test description",
    transferData: {
      name: "test",
    },
  };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(SelectorItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets name", () => {
    createComponent({propsData});
    expect(wrapper.find("b").html()).toContain(propsData.name);
  });

  it("It sets description", () => {
    createComponent({propsData});
    expect(wrapper.find("span").html()).toContain(propsData.description);
  });

});
