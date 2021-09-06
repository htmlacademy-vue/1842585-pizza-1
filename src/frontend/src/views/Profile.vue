<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <img :src="user.avatar" :alt="user.name" width="72" height="72" />
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон:
        <span>{{ user.tel }}</span>
      </p>
    </div>

    <div v-for="address in addresses" :key="address.id" class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>{{ address.name }}</b>
          <div class="address-form__edit">
            <button
              type="button"
              class="icon"
              @click="changeAddress(address.id)"
            >
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>{{ getAddressDescr(address) }}</p>
        <small>{{ address.comment }}</small>
      </div>
    </div>

    <div v-if="modalOpen" class="popup layout__address">
      <form class="address-form address-form--opened sheet">
        <button class="close close--white" @click="modalOpen = false">
          <span class="visually-hidden">Закрыть форму</span>
        </button>
        <div class="address-form__header">
          <b>Адрес №{{ currentAddress.id }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <AppInput
                ref="name"
                type="text"
                name="name"
                v-model="currentAddress.name"
                placeholder="Введите название адреса"
                :error-text="validations.name.error"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <AppInput
                type="text"
                name="street"
                v-model="currentAddress.street"
                placeholder="Введите название улицы"
                :error-text="validations.street.error"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <AppInput
                type="text"
                name="building"
                v-model="currentAddress.building"
                placeholder="Введите номер дома"
                :error-text="validations.building.error"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <AppInput
                type="text"
                name="flat"
                v-model="currentAddress.flat"
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <AppInput
                type="text"
                name="comment"
                v-model="currentAddress.comment"
                placeholder="Введите комментарий"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            type="button"
            class="button button--transparent"
            data-test="delete-address"
            @click.prevent="deleteAddr(currentAddress.id)"
          >
            Удалить
          </button>
          <button
            type="submit"
            class="button"
            data-test="save-address"
            @click.prevent="saveAddress"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click.prevent="addNewAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { getAddressDescr } from "@/common/helpers";
import validator from "@/common/validator";

const defaultAddress = {
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

export default {
  name: "Profile",
  mixins: [validator],
  created() {
    this.$store.dispatch("Auth/getAddresses");
  },
  data() {
    return {
      currentAddress: {
        ...defaultAddress,
      },
      modalOpen: false,
      validations: {
        name: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    "currentAddress.name": function () {
      this.$clearValidationErrors();
    },
    "currentAddress.street": function () {
      this.$clearValidationErrors();
    },
    "currentAddress.building": function () {
      this.$clearValidationErrors();
    },
  },
  computed: {
    ...mapState("Auth", ["user", "addresses"]),
  },
  methods: {
    ...mapActions("Auth", ["addAddress", "deleteAddress"]),
    getAddressDescr,
    changeAddress(id) {
      const address = this.addresses.find((address) => address.id === id);
      if (address) {
        this.currentAddress = { ...address };
      } else {
        this.currentAddress = { ...defaultAddress };
      }
      this.modalOpen = true;
    },
    addNewAddress() {
      this.changeAddress(0);
    },
    saveAddress() {
      if (
        !this.$validateFields(
          {
            name: this.currentAddress.name,
            street: this.currentAddress.street,
            building: this.currentAddress.building,
          },
          this.validations
        )
      ) {
        return;
      }
      this.addAddress(this.currentAddress);
      this.modalOpen = false;
    },
    deleteAddr(id) {
      this.deleteAddress(id);
      this.modalOpen = false;
    },
    getAttribute(name) {
      return this.currentAddress?.[name];
    },
  },
};
</script>
<style scoped>
.popup {
  width: 50%;
}
</style>
