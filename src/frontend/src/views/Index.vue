<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <!-- Блок выбора толщины пиццы-->
      <div class="content__dough">
        <div class="sheet">
          <h2 class="title title--small sheet__title">
            Выберите тесто
          </h2>
          <div class="sheet__content dough">
            <label
              v-for="(pizzaItem, index) in pizza.dough"
              :key="index"
              class="dough__input"
              :class="`dough__input--${ pizzaItem.name === 'Тонкое' ?
                'light' : 'large' }`">
              <input
                type="radio"
                name="dough"
                :value="pizzaItem.price"
                class="visually-hidden"
                :checked="index === 0"
              />
              <b>{{ pizzaItem.name }}</b>
              <span>{{ pizzaItem.description }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Блок выбора диаметра пиццы-->
      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">
            Выберите размер
          </h2>
          <div class="sheet__content diameter">
            <label
              v-for="(sizeItem, index) in pizza.sizes"
              :key="index"
              :class="`diameter__input diameter__input--${sizes[sizeItem.multiplier]}`"
            >
              <input
                type="radio"
                name="diameter"
                :value="sizeItem.multiplier"
                class="visually-hidden"
                :checked="index === 1"
              >
              <span>{{ sizeItem.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Блок выбора ингридиентов пиццы-->
      <div class="content__ingridients">
        <div class="sheet">
          <h2 class="title title-small sheet__title">
            Выберите ингридиенты
          </h2>

          <div class="sheet__content ingridients">

            <div class="ingridients__sauce">
              <p>Основной соус:</p>

              <label
                v-for="(souceItem, index) in pizza.sauces"
                :key="index"
                class="radio ingridients__input"
              >
                <input
                  type="radio"
                  name="sauce"
                  :value="souceItem.price"
                  :checked="index === 0"
                />
                <span>{{ souceItem.name }}</span>
              </label>
            </div>

            <div class="ingridients__filling">
              <p>Начинка:</p>

              <ul class="ingridients__list">
                <li
                  v-for="(ingredient, index) in pizza.ingredients"
                  :key="index"
                  class="ingridients__item"
                >
                  <span
                    class="filling filling--ingridient"
                    :style="`--ingridient-img: url(${ingredient.image})`"
                  >
                    {{ ingredient.name }}
                  </span>

                  <div class="counter counter--orange ingridients__counter">
                    <button
                      type="button"
                      class="counter__button counter__button--disabled counter__button--minus"
                    >
                      <span class="visually-hidden">Меньше</span>
                    </button>
                    <input
                      type="text"
                      name="counter"
                      class="counter__input"
                      value="0"
                    />
                    <button
                      type="button"
                      class="counter__button counter__button--plus"
                    >
                      <span class="visually-hidden">Больше</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок общего результата-->
      <div class="content__pizza">
        <label class="input">
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
          />
        </label>

        <div class="content__constructor">
          <div class="pizza pizza--foundation--big-tomato">
            <div class="pizza__wrapper">
              <div class="pizza__filling pizza__filling--ananas"></div>
              <div class="pizza__filling pizza__filling--bacon"></div>
              <div class="pizza__filling pizza__filling--cheddar"></div>
            </div>
          </div>
        </div>

        <div class="content__result">
          <p>Итого: 0 ₽</p>
          <button
            type="submit"
            class="button button--disabled"
            disabled
          >
            Готовьте!
          </button>
        </div>
      </div>

    </div>
  </form>
</template>

<script>
import pizza from '@/static/pizza.json';
import sizes from '@/common/enums/sizes';

export default {
  name: 'Index',
  data() {
    return {
      pizza,
      sizes
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
