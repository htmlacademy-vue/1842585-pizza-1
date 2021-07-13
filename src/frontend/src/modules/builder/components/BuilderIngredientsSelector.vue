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
              :transferData="{ sauce: souce.type, saucePrice: souce.price }"
            >
              <RadioButton
                name="sauce"
                :value="souce.type"
                :checked="souce.type === currentSauce"
                @changed="changed"
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
                :transferData="getIngridient(ingredient.type, ingredient.price)"
              />
              <ItemCounter
                :name="ingredient.type"
                :count="getIngridient(ingredient.type).count"
                :price="ingredient.price"
                @setCount="addIngridient"
              />
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

const ingridientTypes = {
  Грибы: "mushrooms",
  Чеддер: "cheddar",
  Салями: "salami",
  Ветчина: "ham",
  Ананас: "ananas",
  Бекон: "bacon",
  Лук: "onion",
  Чили: "chile",
  Халапеньо: "jalapeno",
  Маслины: "olives",
  Томаты: "tomatoes",
  Лосось: "salmon",
  Моцарелла: "mozzarella",
  Пармезан: "parmesan",
  "Блю чиз": "blue_cheese",
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
    ingredientsList: {
      type: Array,
      default: () => [],
    },
    currentSauce: {
      type: String,
      default: "tomato",
    },
    currentIngridients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const sauces = this.saucesList.map((sauce) => {
      return {
        ...sauce,
        type: sauceTypes[sauce.name],
      };
    });
    const ingredients = this.ingredientsList.map((ingredient) => {
      return {
        ...ingredient,
        type: ingridientTypes[ingredient.name],
      };
    });
    return {
      sauces,
      ingredients,
    };
  },
  methods: {
    changed(transferData) {
      this.$emit("changed", transferData);
    },
    addIngridient(ingridient) {
      this.$emit("addIngridient", ingridient);
    },
    getIngridient(name, price = 0) {
      let currentIngridient = this.currentIngridients.find((ingridient) => {
        return ingridient.name === name;
      });
      if (!currentIngridient) {
        currentIngridient = {
          name,
          price,
          count: 0,
        };
      }
      return {
        ...currentIngridient,
      };
    },
  },
};
</script>
