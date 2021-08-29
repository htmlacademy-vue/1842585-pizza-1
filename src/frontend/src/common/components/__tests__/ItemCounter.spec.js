import {shallowMount} from "@vue/test-utils";
import ItemCounter from "../ItemCounter";

describe("ItemCounter", () => {
  const elementClass = "counter";
  const buttonClassMinus = "counter__button--minus";
  const buttonClassPlus = "counter__button--plus";
  const propsData = {
    item: {
      count: 0,
      maxCount: 3,
    },
    buttonClass: "counter__button--disabled",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    propsData.item.count = 0;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial count", () => {
    createComponent({propsData});
    expect(+wrapper.find("input").element.value).toBe(propsData.item.count);
  });

  it("Has div counter", () => {
    createComponent({propsData});
    expect(wrapper.find(`div.${elementClass}`)).toBeTruthy();
  });

  it("Has button minus count", () => {
    createComponent({propsData});
    expect(wrapper.find(`.${buttonClassMinus}`)).toBeTruthy();
  });

  it("Has button plus count", () => {
    createComponent({propsData});
    expect(wrapper.find(`.${buttonClassPlus}`)).toBeTruthy();
  });

  it("It emits an button minus event when click", async () => {
    propsData.item.count = 3;
    createComponent({propsData});
    let button = wrapper.find(`.${buttonClassMinus}`);
    await button.trigger("click");
    expect(wrapper.emitted("setCount")).toEqual([[{...propsData.item, count: 2}]]);
  });

  it("It emits an button plus event when click", async () => {
    createComponent({propsData});
    let button = wrapper.find(`.${buttonClassPlus}`);
    await button.trigger("click");
    expect(wrapper.emitted("setCount")).toEqual([[{...propsData.item, count: 1}]]);
  });

  it("Button minus is disabled if count = 0", () => {
    createComponent({propsData});
    expect(wrapper.find(`.${buttonClassMinus}`).element.disabled).toBeTruthy();
  });

  it("Button plus is disabled if count = maxCount", () => {
    propsData.item.count = propsData.item.maxCount;
    createComponent({propsData});
    expect(wrapper.find(`.${buttonClassPlus}`).element.disabled).toBeTruthy();
  });

});
