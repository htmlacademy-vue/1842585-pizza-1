<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title-small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in sauces"
            :key="index"
            class="radio ingridients__input"
          >
            <SelectorItem
              :description="sauce.name"
              :transferData="{ option: 'sauce', value: sauce }"
            >
              <RadioButton
                name="sauce"
                :value="sauce"
                :checked="sauce.type === pizza.sauce.type"
                @setOption="setOption"
              />
            </SelectorItem>
          </label>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingridients__item"
            >
              <SelectorItem
                :class="`filling filling--${ingredient.type}`"
                :description="ingredient.name"
                :transferData="getIngredient(ingredient.type)"
              />
              <ItemCounter
                :item="getIngredient(ingredient.type)"
                class="counter--orange ingridients__counter"
                @setCount="addIngredient"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    SelectorItem,
  },
  computed: {
    ...mapState("Builder", ["ingredients", "sauces", "pizza"]),
    ...mapGetters("Builder", ["getIngredient"]),
  },
  methods: {
    ...mapActions("Builder", ["addIngredient", "setOption"]),
  },
};
</script>
