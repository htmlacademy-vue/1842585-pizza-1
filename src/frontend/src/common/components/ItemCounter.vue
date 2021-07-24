<template>
  <div class="counter">
    <button
      type="button"
      @click="setCount(-1)"
      class="counter__button counter__button--minus"
      :class="{
        'counter__button--disabled': item.count === 0,
        [buttonClass]: item.count > 0,
      }"
      :disabled="item.count === 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="item.count"
    />
    <button
      type="button"
      @click="setCount(1)"
      class="counter__button counter__button--plus"
      :class="{
        'counter__button--disabled': isDisable,
        [buttonClass]: !isDisable,
      }"
      :disabled="isDisable"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "ItemCounter",
  props: {
    item: {
      type: Object,
      required: true,
    },
    buttonClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    isDisable() {
      return this.item.maxCount ? this.item.count >= this.item.maxCount : false;
    },
  },
  methods: {
    setCount(value) {
      const count = Math.max(
        this.item.maxCount
          ? Math.min(this.item.count + value, this.item.maxCount)
          : this.item.count + value,
        0
      );
      this.$emit("setCount", {
        ...this.item,
        count,
      });
    },
  },
};
</script>
