<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <!-- Блок выбора толщины пиццы-->
      <BuilderDoughSelector />

      <!-- Блок выбора диаметра пиццы-->
      <BuilderSizeSelector />

      <!-- Блок выбора ингридиентов пиццы-->
      <BuilderIngredientsSelector />

      <!-- Блок общего результата-->
      <div class="content__pizza">
        <label class="input">
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
            :value="pizzaName"
            @input="inputText"
            required
          />
        </label>

        <BuilderPizzaView />
        <BuilderPriceCounter />
      </div>
    </div>
    <router-view />
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { INPUT_TEXT_TIME } from "@/common/constants";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    pizzaName() {
      return this.pizza?.name;
    },
  },
  methods: {
    ...mapActions("Builder", ["setName"]),
    inputText($event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setName($event.target.value);
      }, INPUT_TEXT_TIME);
    },
  },
};
</script>
