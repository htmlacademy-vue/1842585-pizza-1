<template>
  <div>
    <AppLayout />
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <!-- Блок выбора толщины пиццы-->
        <BuilderDoughSelector :doughList="doughList" />

        <!-- Блок выбора диаметра пиццы-->
        <BuilderSizeSelector :sizesList="sizes" />

        <!-- Блок выбора ингридиентов пиццы-->
        <BuilderIngredientsSelector
          :saucesList="sauces"
          :ingredients="ingredients"
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

          <BuilderPizzaView @changed="changed" />
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

let result = {
  ingridients: [],
};

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
    return {
      doughList: pizza.dough,
      sizes: pizza.sizes,
      sauces: pizza.sauces,
      ingredients: pizza.ingredients,
    };
  },
  methods: {
    changed(transferData) {
      if (transferData.ingridient) {
        const ingridientCount = result.ingridients[transferData.ingridient];
        result.ingridients = {
          ...result.ingridients,
          [transferData.ingridient]: ingridientCount ? ingridientCount + 1 : 1,
        };
      } else {
        result = { ...result, ...transferData };
      }
      console.log(result);
    },
  },
};
</script>
