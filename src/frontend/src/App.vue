<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <transition
        name="slide"
        appear
        enter-active-class="animate__animated animate__slideInRight"
      >
        <router-view />
      </transition>
    </AppLayout>
    <div v-else>Идет загрузка</div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    this.$store.dispatch("init");
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
