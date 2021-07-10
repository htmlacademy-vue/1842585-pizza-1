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
  props: {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setCount(value) {
      this.$emit("setCount", {
        ingridient: {
          name: this.name,
          count: Math.max(Math.min(this.count + value, 3), 0),
        },
      });
    },
  },
};
</script>
