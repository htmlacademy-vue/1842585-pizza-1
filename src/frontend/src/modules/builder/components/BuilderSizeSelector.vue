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
            :transferData="{ option: 'size', value: size }"
          >
            <RadioButton
              name="size"
              :value="size"
              :checked="size.type === pizza.size.type"
              className="visually-hidden"
              @setOption="setOption"
            />
          </SelectorItem>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import SelectorItem from "@/common/components/SelectorItem";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  computed: {
    ...mapState("Builder", ["sizes", "pizza"]),
  },
  methods: {
    ...mapActions("Builder", ["setOption"]),
  },
};
</script>
