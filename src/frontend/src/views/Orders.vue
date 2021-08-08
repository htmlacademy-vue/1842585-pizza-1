<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <section v-for="order in orders" :key="order.id" class="sheet order">
      <div class="order__wrapper">
        <div class="order__number">
          <b>Заказ #{{ order.id }}</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ sum(order) }} ₽</span>
        </div>

        <div class="order__button">
          <button
            type="button"
            class="button button--border"
            @click.prevent="deleteOrder(order.id)"
          >
            Удалить
          </button>
        </div>
        <div class="order__button">
          <button type="button" class="button" @click="repeatAgain(order)">
            Повторить
          </button>
        </div>
      </div>

      <ul class="order__list">
        <li v-for="pizza in order.pizzas" :key="pizza.id" class="order__item">
          <div class="product">
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
                  {{ `${pizza.size.name}, ${getTypeDescr(pizza.dough.type)}` }}
                </li>
                <li>Соус: {{ pizza.sauce.name }}</li>
                <li>Начинка: {{ getIngredientDescr(pizza.ingredients) }}</li>
              </ul>
            </div>
          </div>
          <p class="order__price">{{ getSum(pizza) }} ₽</p>
        </li>
      </ul>

      <ul class="order__additional">
        <li v-for="misc in order.additional" :key="misc.id">
          <img :src="misc.image" width="20" height="30" :alt="misc.name" />
          <p>
            <span>{{ misc.name }}</span>
            <b>{{ `${misc.price} ₽ x ${misc.count}` }} </b>
          </p>
        </li>
      </ul>

      <p class="order__address">
        {{
          `Адрес доставки: ${order.address.name} (${getAddressDescr(
            order.address
          )})`
        }}
      </p>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  getIngredientDescr,
  getTypeDescr,
  getSum,
  getAddressDescr,
} from "@/common/helpers";

export default {
  name: "Orders",
  created() {
    this.$store.dispatch("Orders/query");
  },
  data() {
    return {
      getIngredientDescr,
      getAddressDescr,
      getTypeDescr,
      getSum,
    };
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapGetters("Orders", ["sum"]),
  },
  methods: {
    ...mapActions("Orders", ["deleteOrder", "repeatOrder"]),
    repeatAgain(order) {
      this.repeatOrder(order);
      this.$router.push("/cart");
    },
  },
};
</script>
