import { shallowMount } from "@vue/test-utils";
import AppModal from "../AppModal";

describe("AppModal", () => {
  const elementClass = "popup";
  const slots = {
    default: "default",
  };
  const propsData = {
    popupOpen: true,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppModal, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It contains slots content", () => {
    createComponent({ propsData, slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Has popup class", () => {
    createComponent({ propsData });
    expect(wrapper.find("div").attributes("class")).toContain(elementClass);
  });

  it("Modal is opened", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("div");
  });

  it("Modal is closed", () => {
    propsData.popupOpen = false;
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain("div");
  });
});
