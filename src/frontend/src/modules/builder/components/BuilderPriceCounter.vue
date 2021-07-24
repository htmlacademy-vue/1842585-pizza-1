<template>
  <div class="content__result">
    <p>Итого: {{ sum }} ₽</p>
    <button
      type="submit"
      class="button"
      :class="{ 'button--disabled': notRequired }"
      :disabled="notRequired"
      @click.prevent="addToCart"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", ["sum"]),
    notRequired() {
      return !this.sum || !this.pizza.name;
    },
  },
  methods: {
    ...mapActions("Cart", ["addPizza", "updatePizza"]),
    ...mapActions("Builder", ["resetPizza"]),
    addToCart() {
      const value = {
        ...this.pizza,
        count: this.pizza.count ? this.pizza.count : 1,
      };
      if (value.id) {
        this.updatePizza(value);
      } else {
        this.addPizza(value);
      }
      this.resetPizza();
    },
  },
};
</script>
