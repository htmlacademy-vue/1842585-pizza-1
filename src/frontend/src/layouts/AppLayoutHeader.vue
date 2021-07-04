<template>
  <header class="header">
    <div class="header__logo">
      <a class="logo">
        <img 
          src="@/assets/img/logo.svg" 
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </a>
    </div>
    <div>
      <form action="#" class="header__search">
        <input 
          type="search" 
          name="search"
          required
          placeholder="Поиск"
        />
        <button type="submit">Найти</button>
      </form>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppLayoutHeader'
  };
</script>

<style lang="scss" scoped>

</style>
