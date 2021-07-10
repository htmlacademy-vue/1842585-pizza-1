<template>
  <AppDrop @drop="drop">
    <div class="content__constructor">
      <div :class="`pizza pizza--foundation--${getSize()}-${sauce}`">
        <div class="pizza__wrapper">
          <div v-html="getIngridientsTemplate()"></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>
<script>
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: {
    AppDrop,
  },
  props: {
    doughType: {
      type: String,
      default: "small",
    },
    sauce: {
      type: String,
      default: "tomato",
    },
    ingridients: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    drop(transferData) {
      if (transferData.ingridient) {
        transferData.ingridient.count = Math.min(
          transferData.ingridient.count + 1,
          3
        );
      }
      this.$emit("changed", transferData);
    },
    getSize() {
      return this.doughType === "large" ? "big" : "small";
    },
    getIngridientClass(name, position) {
      return `
        pizza__filling pizza__filling--${name}
        ${position === 1 ? "pizza__filling--second" : ""}
        ${position === 2 ? "pizza__filling--third" : ""}
      `;
    },
    getIngridientsTemplate() {
      let result = "";
      this.ingridients.forEach((ingridient) => {
        for (let i = 0; i < ingridient.count; i++) {
          result =
            result +
            `
              <div
                key="${ingridient.name + i}"
                class="${this.getIngridientClass(ingridient.name, i)}"
              ></div>
            `;
        }
      });
      return result;
    },
  },
};
</script>
