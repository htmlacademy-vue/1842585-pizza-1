<template>
  <div v-if="popupOpen" class="popup">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "AppModal",
  props: {
    popupOpen: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
