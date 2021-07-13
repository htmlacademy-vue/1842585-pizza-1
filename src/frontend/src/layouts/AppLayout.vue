<template>
  <component :is="layout" :sum="sum">
    <slot />
  </component>
</template>
<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    sum: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
