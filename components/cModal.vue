<template>
  <div v-if="showModal">
    <div id="fade"></div>
    <div class="modal">
      <div class="title" :class="typeEvent === 'delete' && 'mb-8'">
        {{ title }}<span @click="closeModal()"><svg-btn-close /></span>
      </div>
      <div v-if="showCreateOrUpdate" class="form ma-5 mb-10">
        <div class="input-text mb-5" :class="nameEmpty && 'input-error'">
          <label for="name">Nome <span class="required">*</span></label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Informe"
            data-testid="input-name"
          />
          <span v-if="nameEmpty" data-testid="input-error-user"
            >Campo obrigatório</span
          >
        </div>
        <div class="input-text" :class="jobEmpty && 'input-error'">
          <label for="job">Vaga <span class="required">*</span></label>
          <input
            id="job"
            v-model="job"
            type="text"
            placeholder="Informe vaga"
            data-testid="input-job"
          />
          <span v-if="jobEmpty" data-testid="input-error-user"
            >Campo obrigatório</span
          >
        </div>
      </div>
      <div v-else class="delete-warning">
        <svg-warning />
        <p>
          Você tem certeza que quer excluir
          <span>'{{ user.first_name }} {{ user.last_name }}'</span>?
        </p>
      </div>
      <div class="actions" :class="typeEvent === 'delete' && 'justify-center'">
        <button
          :disabled="loading"
          :class="typeEvent === 'delete' ? 'primary mx-2' : 'btn-outlined'"
          data-testid="btn-cancel"
          @click="closeModal"
        >
          <span class="text-white">{{
            typeEvent === 'delete' ? 'Cancelar' : 'Voltar'
          }}</span>
        </button>
        <button
          v-if="typeEvent === 'create'"
          :disabled="loading"
          data-testid="btn-create-confirm"
          @click="createUser()"
        >
          <span v-if="loading" class="lds-dual-ring"></span>
          <span v-else class="text-white">Adicionar</span>
        </button>
        <button
          v-if="typeEvent === 'update'"
          :disabled="loading"
          data-testid="btn-update-confirm"
          @click="updateUser()"
        >
          <span v-if="loading" class="lds-dual-ring"></span>
          <span v-else class="text-white">Salvar</span>
        </button>
        <button
          v-if="typeEvent === 'delete'"
          :disabled="loading"
          class="btn-outlined mx-2"
          data-testid="btn-delete-confirm"
          @click="deleteUser()"
        >
          <span v-if="loading" class="lds-dual-ring spinner-primary"></span>
          <span v-else>Excluir</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    typeEvent: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      default: Object,
    },
    showModal: {
      type: Boolean,
      required: true,
    },
    toast: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      titles: {
        create: 'Adicionar Candidato',
        update: 'Editar Candidato',
        delete: 'Exclusão Candidato',
      },
      fullName: '',
      job: '',
      nameEmpty: false,
      jobEmpty: false,
    }
  },
  computed: {
    title() {
      return this.titles[this.typeEvent]
    },
    showCreateOrUpdate() {
      return this.typeEvent === 'create' || this.typeEvent === 'update'
    },
    name: {
      set(value) {
        this.fullName = value
      },
      get() {
        if (this.typeEvent === 'create' && this.fullName) {
          return this.fullName
        }
        return this.user.first_name && this.user.last_name
          ? this.user.first_name + ' ' + this.user.last_name
          : ''
      },
    },
  },
  methods: {
    async createUser() {
      if (!this.validate()) return

      this.loading = true
      const payload = {
        name: this.fullName,
        job: this.job,
      }
      await this.$azTecnologiaAPI
        .post('users', payload)
        .then(({ data }) => {
          this.$emit('update:toast', {
            show: true,
            type: 'success',
            text: 'Cadastro realizado com sucesso!',
          })
          this.$store.commit('users/SET_USER', {
            id: data.id,
            avatar: 'https://avatars.githubusercontent.com/u/37278149?s=96&v=4',
            email: '_daniel_@hotmail.com.br',
            first_name: this.fullName,
            last_name: 'Martins',
          })
          this.$emit('update:showModal', false)
        })
        .catch((error) => {
          this.$emit('update:toast', {
            show: true,
            type: 'error',
            text: 'Não foi possível cadastrar o candidato, favor tente novamente!',
          })
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async updateUser() {
      if (!this.validate()) return

      const getName = this.fullName ? this.fullName : this.name

      this.loading = true
      const payload = {
        name: getName,
        job: this.job,
      }
      await this.$azTecnologiaAPI
        .put(`users/${this.user.id}`, payload)
        .then(() => {
          this.$emit('update:toast', {
            show: true,
            type: 'success',
            text: 'Cadastro alterado com sucesso!',
          })
          this.$store.dispatch('users/updateUser', {
            userId: this.user.id,
            firstName: getName,
          })
          this.$emit('update:showModal', false)
        })
        .catch((error) => {
          this.$emit('update:toast', {
            show: true,
            type: 'error',
            text: 'Não foi possível alterar o cadastro, favor tente novamente!',
          })
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async deleteUser() {
      this.loading = true
      await this.$azTecnologiaAPI
        .delete(`users/${this.user.id}`)
        .then(() => {
          this.$emit('update:toast', {
            show: true,
            type: 'success',
            text: 'Exclusão realizado com sucesso!',
          })
          this.$store.dispatch('users/removeUser', this.user.id)
          this.$emit('update:showModal', false)
        })
        .catch((error) => {
          this.$emit('update:toast', {
            show: true,
            type: 'error',
            text: 'Não foi possível excluir o candidato, favor tente novamente!',
          })
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    closeModal() {
      this.$emit('update:showModal', false)
    },
    validate() {
      this.nameEmpty = false
      this.jobEmpty = false
      if (!this.fullName && !this.name) {
        this.nameEmpty = true
        return false
      } else if (this.job.length <= 0) {
        this.jobEmpty = true
        return false
      } else {
        return true
      }
    },
  },
}
</script>
<style lang="scss" scoped>
#fade {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.6;
  z-index: 5;
}
.modal {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 90%;

  border-radius: 8px;
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: var(--primary);
    font-weight: 700;
    font-size: 15px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    color: #fff;
    span {
      cursor: pointer;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    padding: 17px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
}
.delete-warning {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  p {
    margin: 17px 48px 60px 48px;
    text-align: center;
    color: var(--secondary);
    font-weight: 400;
    font-size: 20px;
    span {
      font-weight: 600;
    }
  }
}
.spinner-primary::after {
  border-color: var(--primary) transparent var(--primary) transparent !important;
}
</style>
