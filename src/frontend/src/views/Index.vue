<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <!-- Блок выбора толщины пиццы-->
      <div class="content__dough">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите тесто</h2>
          <div class="sheet__content dough">
            <label
              v-for="(dough, index) in doughList"
              :key="index"
              class="dough__input"
              :class="`dough__input--${dough.type}`"
            >
              <input
                type="radio"
                name="dough"
                :value="dough.type"
                class="visually-hidden"
                :checked="index === 0"
              />
              <b>{{ dough.name }}</b>
              <span>{{ dough.description }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Блок выбора диаметра пиццы-->
      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите размер</h2>
          <div class="sheet__content diameter">
            <label
              v-for="(size, index) in sizes"
              :key="index"
              :class="`diameter__input diameter__input--${size.type}`"
            >
              <input
                type="radio"
                name="diameter"
                :value="size.type"
                class="visually-hidden"
                :checked="index === 1"
              />
              <span>{{ size.name }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Блок выбора ингридиентов пиццы-->
      <div class="content__ingridients">
        <div class="sheet">
          <h2 class="title title-small sheet__title">Выберите ингридиенты</h2>

          <div class="sheet__content ingridients">
            <div class="ingridients__sauce">
              <p>Основной соус:</p>

              <label
                v-for="(souce, index) in sauces"
                :key="index"
                class="radio ingridients__input"
              >
                <input
                  type="radio"
                  name="sauce"
                  :value="souce.type"
                  :checked="index === 0"
                />
                <span>{{ souce.name }}</span>
              </label>
            </div>

            <div class="ingridients__filling">
              <p>Начинка:</p>

              <ul class="ingridients__list">
                <li
                  v-for="(ingredient, index) in ingredients"
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
                      class="
                        counter__button
                        counter__button--disabled
                        counter__button--minus
                      "
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
          <button type="submit" class="button button--disabled" disabled>
            Готовьте!
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";

const sizeTypes = {
  1: "small",
  2: "normal",
  3: "big",
};

const doughTypes = {
  Тонкое: "light",
  Толстое: "large",
};

const sauceTypes = {
  Томатный: "tomato",
  Сливочный: "creamy",
};

export default {
  name: "Index",
  data() {
    const doughList = pizza.dough.map((doughItem) => {
      doughItem.type = doughTypes[doughItem.name];
      return doughItem;
    });

    const sizes = pizza.sizes.map((size) => {
      size.type = sizeTypes[size.multiplier];
      return size;
    });

    const sauces = pizza.sauces.map((sauce) => {
      sauce.type = sauceTypes[sauce.name];
      return sauce;
    });

    const ingredients = Array.from(pizza.ingredients);

    return {
      doughList,
      sizes,
      sauces,
      ingredients,
    };
  },
};
</script>

<style lang="scss" scoped>
.filling {
  &--ingridient::before {
    background-image: var(--ingridient-img);
  }
}
</style>
