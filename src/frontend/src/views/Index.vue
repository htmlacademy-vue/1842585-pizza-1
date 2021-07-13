<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <!-- Блок выбора толщины пиццы-->
      <BuilderDoughSelector
        :doughList="doughList"
        :currentDough="result.dough"
        @changed="changed"
      />

      <!-- Блок выбора диаметра пиццы-->
      <BuilderSizeSelector
        :sizesList="sizesList"
        :currentSize="result.diameter"
        @changed="changed"
      />

      <!-- Блок выбора ингридиентов пиццы-->
      <BuilderIngredientsSelector
        :saucesList="saucesList"
        :ingredientsList="ingredientsList"
        :currentIngridients="result.ingridients"
        :currentSauce="result.sauce"
        @changed="changed"
        @addIngridient="addIngridient"
      />

      <!-- Блок общего результата-->
      <div class="content__pizza">
        <label class="input">
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
          />
        </label>

        <BuilderPizzaView
          :doughType="result.dough"
          :sauce="result.sauce"
          :ingridients="result.ingridients"
          @changed="changed"
          @addIngridient="addIngridient"
        />
        <BuilderPriceCounter :sum="result.sum" @addToCart="addToCart" />
      </div>
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

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
    let result = {
      doughPrice: 0,
      multiplier: 0,
      saucePrice: 0,
      ingridients: [],
      sum: 0,
    };
    const cart = [];
    return {
      doughList: pizza.dough,
      sizesList: pizza.sizes,
      saucesList: pizza.sauces,
      ingredientsList: pizza.ingredients,
      result,
      cart,
    };
  },
  methods: {
    changed(pizzaComponent) {
      this.result = { ...this.result, ...pizzaComponent };
      this.changeSum();
    },
    addIngridient(newIngridient) {
      const ingridient = this.result.ingridients.find((ingridientItem) => {
        return ingridientItem.name === newIngridient.name;
      });
      if (ingridient) {
        ingridient.count = newIngridient.count;
      } else {
        this.result.ingridients.push(newIngridient);
      }
      this.changeSum();
    },
    changeSum() {
      this.result.sum = this.result.ingridients.reduce((sum, ingridient) => {
        return sum + ingridient.count * ingridient.price;
      }, this.result.doughPrice + this.result.saucePrice);
      this.result.sum = this.result.sum * this.result.multiplier;
    },
    addToCart() {
      this.cart.push({ ...this.result });
      this.result = {
        doughPrice: 0,
        multiplier: 0,
        saucePrice: 0,
        ingridients: [],
        sum: 0,
      };
    },
    getCartSum() {
      return this.cart.reduce((sum, cartItem) => {
        return sum + cartItem.sum;
      }, 0);
    },
  },
};
</script>
