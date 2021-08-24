import { shallowMount } from "@vue/test-utils";
import ItemCounter from "@/common/components/ItemCounter";

describe("ItemCounter", () => {
  const elementClass = "counter";
  const buttonClassMinus = "counter__button--minus";
  const buttonClassPlus = "counter__button--plus";
  const propsData = {
    item: {
      count: 0,
      maxCount: 3,
    },
    buttonClass: "",
  };
  const listeners = {
    click: null,
  }

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(ItemCounter, options);
  };

  beforeEach(() => {
    propsData.item.count = 0;
    listeners.click = jest.fn(count => {
      propsData.item.count = Math.max(
        propsData.item.maxCount
          ? Math.min(propsData.item.count + count, propsData.item.maxCount)
          : propsData.item.count + count,
        0
      );
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial count", () => {
    createComponent({ propsData });
    expect(+wrapper.find("input").element.value).toBe(propsData.item.count);
  });

  it("Has div counter", () => {
    createComponent({ propsData });
    expect(wrapper.find(`div.${elementClass}`)).toBeTruthy();
  });

  it("Has button minus count", () => {
    createComponent({ propsData });
    expect(wrapper.find(`.${buttonClassMinus}`)).toBeTruthy();
  });

  it("Has button plus count", () => {
    createComponent({ propsData });
    expect(wrapper.find(`.${buttonClassPlus}`)).toBeTruthy();
  });

  it("It emits an button minus event when click", async () => {
    createComponent({ propsData, listeners });
    let button = wrapper.find(`.${buttonClassMinus}`);
    await button.trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("It emits an button plus event when click", async () => {
    createComponent({ propsData, listeners });
    let button = wrapper.find(`.${buttonClassPlus}`);
    await button.trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("It decreases value when click", async () => {
    propsData.item.count = propsData.item.maxCount;
    const prevCount = propsData.item.count;
    createComponent({ propsData, listeners });
    let button = wrapper.find(`.${buttonClassMinus}`);
    await button.trigger("click");
    expect(propsData.item.count).toBeLessThan(prevCount);
  });

  it("It increases value when click", async () => {
    const prevCount = propsData.item.count;
    createComponent({ propsData, listeners });
    let button = wrapper.find(`.${buttonClassPlus}`);
    await button.trigger("click");
    expect(propsData.item.count).toBeGreaterThan(prevCount);
  });
});
