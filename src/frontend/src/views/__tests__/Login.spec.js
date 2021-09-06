import { mount, createLocalVue } from "@vue/test-utils";
import $validator from "@/common/validator";
import Login from "../Login";
import AppModal from "@/common/components/AppModal";
import AppInput from "@/common/components/AppInput";
import {generateMockStore} from "../../store/mocks";

const localVue = createLocalVue();
localVue.component('AppModal', AppModal);
localVue.component('AppInput', AppInput);

describe("Login", () => {
  let routerPush;
  let dispatch;
  let login;
  let fetchUsers;
  let store;

  const actions = {
    Auth: {
      login,
      fetchUsers,
    },
  }

  const mocks = {
    $router: {
      push: routerPush,
    },
    $validator,
  };

  const stubs = ["router-link"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    routerPush = jest.fn();
    login = jest.fn();
    fetchUsers = jest.fn();
    mocks.$router.push = routerPush;
    actions.Auth.login = login;
    actions.Auth.fetchUsers = fetchUsers;
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("validation mixin has been called on click button", async () => {
    createComponent({ localVue, mocks, stubs, store });
    const spyValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    await wrapper.find(".button").trigger("click");
    expect(spyValidateFields).toHaveBeenCalled();
    expect(login).not.toHaveBeenCalled();
    expect(fetchUsers).not.toHaveBeenCalled();
  });

  it("calls login and fetchUsers are valid", async () => {
    createComponent({ localVue, mocks, stubs, store });
    const emailInput = wrapper
      .find('[data-test="email-component"]')
      .find("input");
    const passInput = wrapper
      .find('[data-test="password-component"]')
      .find("input");

    emailInput.element.value = "test@gmail.com";
    await emailInput.trigger("input");
    passInput.element.value = "123456";
    await passInput.trigger("input");

    await wrapper.find(".button").trigger("click");
    expect(login).toHaveBeenCalled();
    expect(fetchUsers).toHaveBeenCalled();
  });
});
