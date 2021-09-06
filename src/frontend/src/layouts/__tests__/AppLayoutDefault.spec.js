import {shallowMount} from "@vue/test-utils";
import AppLayoutDefault from "../AppLayoutDefault";

const slots = {
  default: "test",
};

describe("AppLayoutDefault", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({slots});
    expect(wrapper.exists()).toBeTruthy();
  });

  it("it renders slot content", () => {
    createComponent({slots});
    expect(wrapper.html()).toContain(slots.default);
  });
});
