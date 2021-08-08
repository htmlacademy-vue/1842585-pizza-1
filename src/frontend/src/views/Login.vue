<template>
  <AppModal :popupOpen="true">
    <div class="sign-form">
      <router-link to="/" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form>
        <div class="sign-form__input">
          <label class="input">
            <span>E-mail</span>
            <AppInput
              ref="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="example@mail.ru"
              :error-text="validations.email.error"
            />
          </label>
        </div>

        <div class="sign-form__input">
          <label class="input">
            <span>Пароль</span>
            <AppInput
              type="password"
              name="password"
              v-model="password"
              placeholder="***********"
              :error-text="validations.password.error"
            />
          </label>
        </div>
        <button type="submit" class="button" @click.prevent="auth">
          Авторизоваться
        </button>
      </form>
    </div>
  </AppModal>
</template>
<script>
import { mapActions } from "vuex";
import validator from "@/common/validator";
import { setAuth } from "@/common/helpers";

export default {
  name: "Login",
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    async auth() {
      if (
        !this.$validateFields(
          { email: this.email, password: this.password },
          this.validations
        )
      ) {
        return;
      }
      await this.login({ email: this.email, password: this.password });
      setAuth(this.$store);
      this.$router.push("/");
    },
  },
};
</script>
