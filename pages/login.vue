<template>
  <div class="login mx-2">
    <div class="brand">
      <img class="mr-4" src="@/static/logo.png" width="73" height="40" alt="" />
      Tecnologia em Gestão
    </div>
    <div class="form px-11 py-16">
      <div
        class="input-text mb-9"
        :class="(emailEmpty || invalidEmail) && 'input-error'"
      >
        <label for="username">Usuário</label>
        <input
          id="username"
          v-model="email"
          type="text"
          placeholder="Informe usuário"
        />
        <span v-if="emailEmpty || invalidEmail">{{
          emailEmpty ? 'Campo obrigatório' : 'E-mail inválido'
        }}</span>
      </div>

      <div class="input-text mb-9" :class="passwordEmpty && 'input-error'">
        <label for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Informe senha"
        />
        <span v-if="passwordEmpty">Campo obrigatório</span>
      </div>

      <button class="primary" :disabled="loading" @click="login">
        <span v-if="loading" class="lds-dual-ring"></span>
        <span v-else class="text-white">Acessar</span>
      </button>
    </div>
    <c-toast v-if="toast.show" :toast.sync="toast" />
    <c-footer />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      toast: {},
      invalidEmail: false,
      emailEmpty: false,
      passwordEmpty: false,
    }
  },
  methods: {
    async login() {
      if (!this.validate()) return

      this.loading = true

      const payload = {
        email: this.email,
        password: this.password,
      }

      await this.$azTecnologiaAPI
        .post('login', payload)
        .then(({ data }) => {
          this.toast = {
            show: true,
            type: 'success',
            text: 'Acesso realizado com sucesso!',
          }
          this.$store.commit('login/SET_TOKEN', data.token)
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch((error) => {
          this.toast = {
            show: true,
            type: 'error',
            text: 'Não foi possível acessar sua conta, verifique seus dados e tente novamente!',
          }
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    validate() {
      this.invalidEmail = false
      this.emailEmpty = false
      this.passwordEmpty = false

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (this.email.length <= 0) {
        this.emailEmpty = true
        return false
      } else if (!regex.test(this.email)) {
        this.invalidEmail = true
        return false
      } else if (this.password.length <= 0) {
        this.passwordEmpty = true
        return false
      } else {
        return true
      }
    },
  },
}
</script>
<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    margin-bottom: 35px;
    color: #8e8e8e;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }
}
</style>
