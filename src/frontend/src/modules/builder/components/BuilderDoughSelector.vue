<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="(dough, index) in doughItems"
          :key="index"
          :class="`dough__input dough__input--${dough.type}`"
        >
          <SelectorItem
            :name="dough.name"
            :description="dough.description"
            :transferData="{ dough: dough.type }"
          >
            <RadioButton
              name="dough"
              :value="dough.type"
              className="visually-hidden"
              :checked="dough.type === currentDough"
              @changed="changed"
            />
          </SelectorItem>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";

const doughType = {
  Тонкое: "light",
  Толстое: "large",
};

export default {
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  props: {
    doughList: {
      type: Array,
      default: () => [],
    },
    currentDough: {
      type: String,
      default: "light",
    },
  },
  data() {
    const doughItems = this.doughList.map((dough) => {
      return {
        ...dough,
        type: doughType[dough.name],
      };
    });
    return {
      doughItems,
    };
  },
  methods: {
    changed(transferData) {
      this.$emit("changed", transferData);
    },
  },
};
</script>
