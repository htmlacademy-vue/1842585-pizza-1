<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="(doughItem, index) in dough"
          :key="index"
          :class="`dough__input dough__input--${doughItem.type}`"
        >
          <SelectorItem
            :name="doughItem.name"
            :description="doughItem.description"
            :transferData="{ option: 'dough', value: doughItem }"
          >
            <RadioButton
              name="dough"
              :value="doughItem"
              className="visually-hidden"
              :checked="doughItem.type === pizza.dough.type"
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
  name: "BuilderDoughSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  computed: {
    ...mapState("Builder", ["dough", "pizza"]),
  },
  methods: {
    ...mapActions("Builder", ["setOption"]),
  },
};
</script>
