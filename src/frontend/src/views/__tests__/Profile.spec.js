import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import { user, addresses } from "@/common/mocks/user";
import Profile from "../index/Profile";
import AppInput from "@/common/components/AppInput";
import $validator from "@/common/validator";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

const initialStore = (store) => {
  store.commit(
    SET_ENTITY,
    {
      module: "Auth",
      value: {
        user,
        addresses,
        isAuthenticated: true,
      },
    },
    { root: true }
  );
};

describe("Profile", () => {
  let store;
  let wrapper;
  let addAddress;
  let deleteAddress;

  const mocks = {
    $validator,
  };

  const createElement = (options) => {
    wrapper = mount(Profile, options);
  };

  beforeEach(() => {
    addAddress = jest.fn();
    deleteAddress = jest.fn();
    const actions = {
      Auth: {
        getAddresses: jest.fn(),
        addAddress,
        deleteAddress,
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    initialStore(store);
    createElement({ localVue, store, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("opens modal for changing address", async () => {
    initialStore(store);
    createElement({ localVue, store, mocks });
    await wrapper.find(".address-form__edit > button").trigger("click");
    expect(wrapper.find(".popup").exists()).toBeTruthy();
  });

  it("saves address", async () => {
    initialStore(store);
    createElement({ localVue, store, mocks });
    await wrapper.find(".address-form__edit > button").trigger("click");
    await wrapper.find("[data-test='save-address']").trigger("click");
    expect(addAddress).toHaveBeenCalled();
  });

  it("deletes address", async () => {
    initialStore(store);
    createElement({ localVue, store, mocks });
    await wrapper.find(".address-form__edit > button").trigger("click");
    await wrapper.find("[data-test='delete-address']").trigger("click");
    expect(deleteAddress).toHaveBeenCalled();
  });
});
