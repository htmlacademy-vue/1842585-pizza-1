<template>
  <AppDrop @drop="drop">
    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
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
  methods: {
    drop(transferData) {
      this.$emit("changed", transferData);
    },
  },
};
</script>
