<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      @click="setCount(-1)"
      class="counter__button counter__button--disabled counter__button--minus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      @click="setCount(1)"
      class="counter__button counter__button--plus"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    setCount(value) {
      if ((this.count !== 0 && value < 0) || value > 0) {
        this.count += value;
      }
    },
  },
};
</script>
