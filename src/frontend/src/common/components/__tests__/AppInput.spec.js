import { shallowMount } from "@vue/test-utils";
import AppInput from "../AppInput";

describe("AppInput", () => {
  const errorClass = "text-field__input--error";
  const propsData = {
    value: "test",
    name: "test",
    type: "submit",
    placeholder: "test",
    errorText: "error",
    required: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It sets initial value", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").element.value).toBe(propsData.value);
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("It emits current input when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    input.element.value = "new test";
    await input.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual("new test");
  });

  it("Input name is prop name", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("name")).toBe(propsData.name);
  });

  it("Input type is prop type", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("type")).toBe(propsData.type);
  });

  it("Input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      propsData.placeholder
    );
  });

  it("it contains errorText from prop errorText", () => {
    createComponent({ propsData });
    expect(wrapper.find("span").html()).toContain(propsData.errorText);
  });

  it("Has error class", () => {
    createComponent({ propsData });
    expect(wrapper.find("input").attributes("class")).toContain(errorClass);
  });

  it("Hasn't span block without error", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain("span");
  });
});
