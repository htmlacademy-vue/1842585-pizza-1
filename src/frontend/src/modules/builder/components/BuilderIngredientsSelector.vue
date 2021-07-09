<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title-small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(souce, index) in sauces"
            :key="index"
            class="radio ingridients__input"
          >
            <SelectorItem
              :description="souce.name"
              :transferData="{ sauce: souce.type }"
            >
              <RadioButton
                name="sauce"
                :value="souce.type"
                :checked="index === 0"
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
                className="filling filling--ingridient"
                :styleText="`--ingridient-img: url(${ingredient.image})`"
                :description="ingredient.name"
                :transferData="{ ingridient: ingredient.name }"
              />
              <ItemCounter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";

const sauceTypes = {
  Томатный: "tomato",
  Сливочный: "creamy",
};

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    RadioButton,
    SelectorItem,
  },
  props: {
    saucesList: {
      type: Array,
      default: () => [],
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const sauces = this.saucesList.map((sauce) => {
      sauce.type = sauceTypes[sauce.name];
      return sauce;
    });

    return {
      sauces,
    };
  },
};
</script>
<style lang="scss">
.filling {
  &--ingridient::before {
    background-image: var(--ingridient-img);
  }
}
</style>
