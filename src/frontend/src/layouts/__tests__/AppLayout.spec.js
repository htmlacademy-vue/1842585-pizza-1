import {shallowMount} from "@vue/test-utils";
import AppLayout from "../AppLayout";
import AppNotifications from "../../common/components/AppNotifications";

const stubs = {
  AppNotifications,
};
const mocks = {
  $store: {
    state: {
      notifications: [],
    },
  },
  $route: {
    meta: {
      layout: "",
    },
  },
};
const slots = {
  default: "test",
};

describe("AppLayout", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({mocks, stubs, slots});
    expect(wrapper.exists()).toBeTruthy();
  });
});
