<template>
  <transition
    name="popup"
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOut"
  >
    <div v-if="popupOpen" class="popup">
      <slot></slot>
    </div>
  </transition>
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
