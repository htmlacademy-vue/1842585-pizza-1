<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>
      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="index"
          :class="`diameter__input diameter__input--${size.type}`"
        >
          <SelectorItem
            :description="size.name"
            :transferData="{ size: size.type }"
          >
            <RadioButton
              name="diameter"
              :value="size.type"
              :checked="index === 1"
              className="visually-hidden"
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

const sizeTypes = {
  1: "small",
  2: "normal",
  3: "big",
};

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  props: {
    sizesList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const sizes = this.sizesList.map((size) => {
      size.type = sizeTypes[size.multiplier];
      return size;
    });
    return {
      sizes,
    };
  },
};
</script>
