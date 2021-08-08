<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ sum }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link v-if="isAuthenticated" to="/profile">
          <img
            :src="getAttr('avatar')"
            :alt="getAttr('name')"
            width="32"
            height="32"
          />
          <span>{{ getAttr("name") }}</span>
        </router-link>
        <a
          href="#"
          v-if="isAuthenticated"
          class="header__logout"
          @click.prevent="logout"
        >
          <span>Выйти</span>
        </a>
        <router-link v-else to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapState("Auth", ["isAuthenticated", "user"]),
    ...mapGetters("Cart", ["sum"]),
  },
  methods: {
    ...mapActions("Auth", ["logout"]),
    getAttr(attrName) {
      return this.user?.[attrName];
    },
  },
};
</script>
