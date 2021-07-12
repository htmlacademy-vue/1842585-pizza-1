<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      @click="setCount(-1)"
      class="counter__button counter__button--minus"
      :class="{ 'counter__button--disabled': count === 0 }"
      :disabled="count === 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      @click="setCount(1)"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--disabled': count === 3 }"
      :disabled="count === 3"
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
    price: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    setCount(value) {
      this.$emit("setCount", {
        name: this.name,
        count: Math.max(Math.min(this.count + value, 3), 0),
        price: this.price,
      });
    },
  },
};
</script>
