<template>
  <AppDrop @drop="drop">
    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${getSize()}-${getPizzaType()}`">
        <div class="pizza__wrapper">
          <transition-group
            name="drop"
            tag="div"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :class="ingredient.class"
            ></div>
          </transition-group>
        </div>
      </div>
    </div>
  </AppDrop>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  computed: {
    ...mapState("Builder", ["pizza"]),
    ingredients() {
      const result = [];
      this.pizza?.ingredients.forEach((ingredient) => {
        for (let i = 0; i < ingredient.count; i++) {
          result.push({
            id: ingredient.type + i,
            class: this.getIngredientClass(ingredient.type, i),
          });
        }
      });
      return result;
    },
  },
  methods: {
    ...mapActions("Builder", ["addIngredient", "setOption"]),
    drop(transferData) {
      if (transferData.count !== undefined) {
        transferData.count = Math.min(
          transferData.count + 1,
          transferData.maxCount
        );
        this.addIngredient(transferData);
      } else {
        this.setOption(transferData);
      }
    },
    getSize() {
      return this.pizza?.dough.type === "large" ? "big" : "small";
    },
    getIngredientClass(name, position) {
      return `
        pizza__filling pizza__filling--${name}
        ${position === 1 ? "pizza__filling--second" : ""}
        ${position === 2 ? "pizza__filling--third" : ""}
      `;
    },
    getPizzaType() {
      return this.pizza?.sauce.type;
    },
  },
};
</script>
