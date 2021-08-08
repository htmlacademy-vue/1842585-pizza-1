<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
    <div v-else>Идет загрузка</div>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import { setAuth } from "@/common/helpers";
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

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

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
