<template>
  <div>
    <div v-if="showUserList" class="box-users user-list-desktop">
      <table v-if="showUserList" class="users">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userData" :key="user.id">
            <td>{{ user.id }}</td>
            <td class="user">
              <img class="avatar" :src="user.avatar" :alt="user.fist_name" />
              <span class="text-truncate"
                >{{ user.first_name }} {{ user.last_name }}</span
              >
            </td>
            <td>
              <span class="text-truncate">{{ user.email }}</span>
            </td>
            <td class="actions">
              <div @click="editUser(user)">
                <svg-edit />
              </div>
              <div @click="deleteUser(user)"><svg-trash /></div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <ul class="mt-5">
          <span class="mr-3"
            >Página {{ pagination.page }} de {{ pagination.totalPages }}
          </span>
          <li
            v-for="page in pagination.totalPages"
            :key="page"
            :class="pagination.page === page && 'active'"
            @click="getUsers(page)"
          >
            {{ page }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showUserList" class="user-list-mobile ma-3">
      <div v-for="user in userData" :key="user.id" class="card pa-3 mt-3">
        <img class="avatar mb-1" :src="user.avatar" :alt="user.fist_name" />
        <span class="mb-1">{{ user.first_name }} {{ user.last_name }}</span>
        <span class="mb-5">{{ user.email }}</span>
        <div class="actions">
          <div @click="editUser(user)">
            <svg-edit />
          </div>
          <div @click="deleteUser(user)"><svg-trash /></div>
        </div>
      </div>
      <button
        v-if="pagination.page < pagination.totalPages"
        class="btn-show-more my-5"
        :disabled="loading"
        @click="getUsers()"
      >
        <span v-if="loading" class="lds-dual-ring"></span>
        <span v-else class="text-white">Ver mais candidatos</span>
      </button>
    </div>
    <div v-if="!showUserList" class="box-users user-list-empty">
      <svg-user-list-empty />
      <p>
        Você não possui nenhum candidato adicionado, clique no botão
        <span>Adicionar</span> para começar.
      </p>
    </div>
    <c-modal
      v-if="showModal"
      :show-modal.sync="showModal"
      :type-event="typeEvent"
      :user="user"
      :toast.sync="toast"
    />
    <c-toast v-if="toast.show" :toast.sync="toast" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      showModal: false,
      user: {},
      typeEvent: '',
      toast: {},
      userData: [],
      pagination: {
        perPage: 6,
        page: 0,
        totalPages: 0,
      },
    }
  },
  computed: {
    showUserList() {
      return this.userData?.length > 0
    },
  },
  created() {
    this.getUsers()
  },
  methods: {
    editUser(user) {
      this.user = user
      this.typeEvent = 'update'
      this.showModal = true
    },
    deleteUser(user) {
      this.user = user
      this.typeEvent = 'delete'
      this.showModal = true
    },
    async getUsers(element) {
      this.loading = true
      element ? (this.pagination.page = element) : (this.pagination.page = +1)

      const page = element || this.pagination.page

      const url = `users?page=${page}&per_page=${this.pagination.perPage}`
      await this.$azTecnologiaAPI
        .get(url)
        .then(({ data }) => {
          element
            ? (this.userData = data.data)
            : this.userData.push(...data.data)
          this.pagination.totalPages = data.total_pages
        })
        .catch((error) => {
          console.error(error)
          this.toast = {
            show: true,
            type: 'error',
            text: 'Não foi possível obter os dados do candidato, favor tente novamente!',
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.box-users {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  height: calc(100vh - 240px);
}
.user-list-desktop {
  justify-content: start;
  height: 100%;
  margin: 25px;
  padding: 25px;
  .users {
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    th {
      font-weight: 700;
      font-size: 16px;
      color: var(--primary);
      text-align: left;
      padding: 0 10px 10px 10px;
    }
    tr {
      border-bottom: 1px solid var(--grey);
      td {
        padding: 10px 10px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 10px;
      }
    }
    .actions {
      display: flex;
      div {
        cursor: pointer;
      }
      div:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .pagination {
    width: 100%;
    ul {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 5px;
      list-style: none;
      span {
        font-weight: 400;
        font-size: 12px;
        color: var(--grey-suva);
      }
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        font-weight: 400;
        font-size: 12px;
        color: var(--grey-suva);
      }
      li.active {
        background-color: var(--primary);
        color: #fff;
        border-radius: 2px;
      }
    }
  }
  @media screen and (max-width: 580px) {
    display: none;
  }
}
.user-list-mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: 100%;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .avatar {
      max-width: 35%;
      max-height: 35%;
      width: 100%;
      height: 100%;
      min-width: 100px;
      min-height: 100px;
    }
    .actions {
      display: flex;
      div {
        cursor: pointer;
      }
      div:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .btn-show-more {
    width: 100%;
    max-width: 350px;
  }
  @media screen and (min-width: 581px) {
    display: none;
  }
}
.user-list-empty {
  margin: 10px;
  padding: 25px;
  p {
    text-align: center;
    margin-top: 8px;
    font-weight: 400;
    font-size: 18px;
    max-width: 411px;
    color: var(--secondary);

    span {
      color: var(--primary);
      font-weight: 700;
    }
  }
}
</style>
