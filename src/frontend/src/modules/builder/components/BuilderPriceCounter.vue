<template>
  <div class="content__result">
    <p>Итого: {{ sum }} ₽</p>
    <button
      type="submit"
      class="button"
      :class="{ 'button--disabled': sum === 0 }"
      :disabled="sum === 0"
      @click.prevent="$emit('addToCart')"
    >
      Готовьте!
    </button>
  </div>
</template>
<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    sum: {
      type: Number,
      default: 0,
    },
  },
};
</script>
