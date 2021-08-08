<template>
  <div v-if="notifications.length" class="notification__wrapper">
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>
<style lang="scss" scoped>
.notification {
  &--info {
    border-color: $purple-400;
    background: $purple-200;
  }
  &--error {
    border-color: $red-900;
    background: $red-800;
  }
  &--success {
    border-color: $green-600;
    background: $green-300;
  }
  &--warning {
    border-color: $orange-300;
    background: $orange-100;
  }
}
</style>
