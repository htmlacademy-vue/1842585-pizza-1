import {shallowMount} from "@vue/test-utils";
import RadioButton from "../RadioButton";

describe("Radio button", () => {
  const propsData = {
    name: "TestButton",
    value: {
      test: "example",
    },
    className: "test",
  }
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(RadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets name", () => {
    createComponent({propsData});
    expect(wrapper.find("input").element.getAttribute("name")).toBe(propsData.name);
  });

  it("It sets class", () => {
    createComponent({propsData});
    expect(wrapper.find("input").classes()).toContain(propsData.className);
  });

  it("It sets value", () => {
    createComponent({propsData});
    expect(wrapper.find("input").element._value).toEqual(propsData.value);
  })

  it("It emits value after click", async () => {
    createComponent({propsData});
    await wrapper.find("input").trigger("click");
    expect(wrapper.emitted("setOption")).toEqual([[{ option: propsData.name, value: propsData.value }]]);
  });

});
