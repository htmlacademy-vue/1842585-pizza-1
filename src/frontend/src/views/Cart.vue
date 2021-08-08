<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <ul v-else class="cart-list sheet">
          <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
            <div class="product cart-list__product">
              <img
                src="/public/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{
                      `${pizza.size.name},
                      ${getTypeDescr(pizza.dough.type)}`
                    }}
                  </li>
                  <li>{{ `Соус: ${pizza.sauce.name.toLowerCase()}` }}</li>
                  <li>
                    {{ `Начинка: ${getIngredientDescr(pizza.ingredients)}` }}
                  </li>
                </ul>
              </div>
            </div>

            <ItemCounter
              :item="pizza"
              class="cart-list__counter"
              buttonClass="counter__button--orange"
              @setCount="updatePizza"
            />

            <div class="cart-list__price">
              <b>{{ `${pizzaSum(pizza)} ₽` }}</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="changePizza(pizza)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>

        <div v-if="!isEmpty" class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="(addItem, index) in additional"
              :key="index"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="addItem.image"
                  width="39"
                  height="60"
                  :alt="addItem.name"
                />
                <span>{{ addItem.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <ItemCounter
                  :item="addItem"
                  class="additional-list__counter"
                  buttonClass="counter__button--orange"
                  @setCount="updateAdditional"
                />

                <div class="additional-list__price">
                  <b>{{ `${addItem.price} ₽` }}</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="!isEmpty" class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select v-model="reciveType" name="reciveType" class="select">
                <option
                  v-for="(type, index) in reciveTypes"
                  :key="index"
                  :value="type.value"
                >
                  {{ type.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <AppInput
                type="text"
                name="tel"
                v-model="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <AppInput
                    type="text"
                    name="street"
                    v-model="street"
                    :error-text="validations.street.error"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <AppInput
                    type="text"
                    name="house"
                    v-model="house"
                    :error-text="validations.house.error"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <AppInput type="text" name="apartment" v-model="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section v-if="!isEmpty" class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>{{ `Итого: ${sum} ₽` }}</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button" @click.prevent="addOrder">
          Оформить заказ
        </button>
      </div>
    </section>

    <AppModal :popupOpen="popupOpen">
      <a href="#" class="close" @click.prevent="closePopup">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button" @click.prevent="closePopup">
          Отлично, я жду!
        </a>
      </div>
    </AppModal>
  </form>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

import ItemCounter from "@/common/components/ItemCounter";
import { reciveTypes } from "@/common/constants";
import { getIngredientDescr, getTypeDescr } from "@/common/helpers";
import validator from "@/common/validator";

export default {
  name: "Cart",
  mixins: [validator],
  components: {
    ItemCounter,
  },
  data() {
    return {
      getIngredientDescr,
      getTypeDescr,
      reciveTypes,
      timeout: null,
      popupOpen: false,
      tel: "",
      street: "",
      house: "",
      apartment: "",
      reciveType: 1,
      validations: {
        street: {
          error: "",
          rules: ["required"],
        },
        house: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    street() {
      this.$clearValidationErrors();
    },
    house() {
      this.$clearValidationErrors();
    },
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["pizzas", "additional"]),
    ...mapGetters("Cart", ["sum", "pizzaSum"]),
    isEmpty() {
      return this.pizzas.length === 0;
    },
  },
  methods: {
    ...mapActions("Cart", [
      "updatePizza",
      "updateAdditional",
      "setOption",
      "createOrder",
    ]),
    ...mapActions("Builder", ["setPizza"]),
    changePizza(pizza) {
      this.setPizza(pizza);
      this.$router.push("/");
    },
    addOrder() {
      if (
        !this.$validateFields(
          { street: this.street, house: this.house },
          this.validations
        )
      ) {
        return;
      }
      const pizzas = this.pizzas.map((pizza) => {
        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.count,
          ingredients: pizza.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.count,
            };
          }),
        };
      });
      const additional = this.additional.filter((addItem) => addItem.count > 0);
      const order = {
        userId: this.user.id,
        pizzas,
        misc: additional.map((addItem) => {
          return {
            miscId: addItem.id,
            quantity: addItem.count,
          };
        }),
        address: {
          name: "Новый адрес",
          street: this.street,
          building: this.house,
          flat: this.apartment,
        },
      };
      this.createOrder(order);
      this.openPopup();
    },
    openPopup() {
      this.popupOpen = true;
    },
    closePopup() {
      this.popupOpen = false;
    },
  },
};
</script>
