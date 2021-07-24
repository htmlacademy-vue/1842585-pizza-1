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

        <ul v-if="!isEmpty" class="cart-list sheet">
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

              <select @input="inputText" name="reciveType" class="select">
                <option
                  v-for="(reciveType, index) in reciveTypes"
                  :key="index"
                  :value="reciveType.value"
                >
                  {{ reciveType.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                type="text"
                name="tel"
                :value="tel"
                placeholder="+7 999-999-99-99"
                @input="inputText"
              />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    type="text"
                    name="street"
                    :value="street"
                    @input="inputText"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    type="text"
                    name="house"
                    :value="house"
                    @input="inputText"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="apartment"
                    :value="apartment"
                    @input="inputText"
                  />
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
        <button type="submit" class="button" @click.prevent="openPopup">
          Оформить заказ
        </button>
      </div>
    </section>

    <section v-if="popupOpen" class="popup">
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
    </section>
  </form>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

import ItemCounter from "@/common/components/ItemCounter";
import { reciveTypes, INPUT_TEXT_TIME } from "@/common/constants";

export default {
  name: "Cart",
  components: {
    ItemCounter,
  },
  data() {
    return {
      reciveTypes,
      timeout: null,
      popupOpen: false,
    };
  },
  computed: {
    ...mapState("Cart", [
      "pizzas",
      "additional",
      "reciveType",
      "tel",
      "street",
      "house",
      "apartment",
    ]),
    ...mapGetters("Cart", ["sum", "pizzaSum"]),
    isEmpty() {
      return this.pizzas.length === 0;
    },
  },
  methods: {
    ...mapActions("Cart", ["updatePizza", "updateAdditional", "setOption"]),
    ...mapActions("Builder", ["setPizza"]),
    changePizza(pizza) {
      this.setPizza(pizza);
      this.$router.push("/");
    },
    getIngredientDescr(ingredients) {
      return ingredients.reduce((prevDecr, ingredient) => {
        return `${prevDecr}${
          prevDecr === "" ? "" : ", "
        } ${ingredient.name.toLowerCase()}`;
      }, "");
    },
    getTypeDescr(type) {
      return type === "light" ? "на тонком тесте." : "на толстом тесте.";
    },
    inputText($event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setOption({
          name: $event.target.name,
          value: $event.target.value,
        });
      }, INPUT_TEXT_TIME);
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
