<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="/" class="logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ sum }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link to="/login" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "AppLayoutHeader",
  props: {
    sum: {
      type: Number,
      default: 0,
    },
  },
};
</script>
