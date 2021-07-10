<template>
  <AppDrag :transferData="transferData">
    <slot />
    <b v-if="name !== ''">{{ name }}</b>
    <span v-if="description !== ''">
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
