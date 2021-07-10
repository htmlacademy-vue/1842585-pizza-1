<template>
  <div>
    <AppLayout />
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
          />
          <BuilderPriceCounter />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import AppLayout from "@/layouts/AppLayout";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    let result = {
      ingridients: [],
    };
    return {
      doughList: pizza.dough,
      sizesList: pizza.sizes,
      saucesList: pizza.sauces,
      ingredientsList: pizza.ingredients,
      result,
    };
  },
  methods: {
    changed(transferData) {
      if (transferData.ingridient) {
        const ingridient = this.result.ingridients.find((ingridientItem) => {
          return ingridientItem.name === transferData.ingridient.name;
        });
        if (ingridient) {
          ingridient.count = transferData.ingridient.count;
        } else {
          this.result.ingridients.push(transferData.ingridient);
        }
      } else {
        this.result = { ...this.result, ...transferData };
      }
    },
  },
};
</script>
