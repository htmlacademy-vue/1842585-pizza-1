<template>
  <AppDrag :transferData="transferData">
    <slot />
    <b v-if="name !== ''">{{ name }}</b>
    <span v-if="description !== ''" :class="className" :style="styleText">
      {{ description }}
    </span>
  </AppDrag>
</template>
<script>
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "SelectorItem",
  components: {
    AppDrag,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    styleText: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    transferData: {
      type: Object,
      required: true,
    },
  },
};
</script>
