<template>
  <div class="container">
    <nav class="vertical-menu" :class="hideMenu && 'hidden'">
      <div class="menu">
        <svg-logo class="brand mt-14 mb-14" />
        <div class="itens-menu">
          <svg-candidatos />
          <a href="#" class="text-white">Candidatos</a>
        </div>
      </div>
      <div class="hide-menu">
        <a href="#" @click="hideMenu = !hideMenu"
          ><svg-hide-menu /> Recolher Menu
        </a>
      </div>
    </nav>
    <main class="content">
      <div>
        <div class="header">
          <div
            class="btn-menu-mobile mr-3"
            @click="showMenuMobile = !showMenuMobile"
          >
            <svg-btn-menu v-if="!showMenuMobile" />
            <svg-btn-close v-else color="primary" size="15" />
          </div>
          <div class="breadcrumbs">
            <div
              v-if="hideMenu"
              class="show-menu-hidden mr-3"
              @click="hideMenu = !hideMenu"
            >
              <svg-btn-menu />
            </div>
            <a href="#" class="mr-1">Candidatos</a> » Listagem dos candidatos
          </div>
          <div class="profile">
            <span
              >Karen
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5575 0.434998L5 3.8775L8.4425 0.434998L9.5 1.5L5 6L0.5 1.5L1.5575 0.434998Z"
                  fill="black"
                  fill-opacity="0.8"
                />
              </svg>
            </span>
            <div class="avatar">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99992 0.333344C7.88397 0.333344 8.73182 0.684533 9.35694 1.30965C9.98206 1.93478 10.3333 2.78262 10.3333 3.66668C10.3333 4.55073 9.98206 5.39858 9.35694 6.0237C8.73182 6.64882 7.88397 7.00001 6.99992 7.00001C6.11586 7.00001 5.26802 6.64882 4.6429 6.0237C4.01777 5.39858 3.66659 4.55073 3.66659 3.66668C3.66659 2.78262 4.01777 1.93478 4.6429 1.30965C5.26802 0.684533 6.11586 0.333344 6.99992 0.333344ZM6.99992 8.66668C10.6833 8.66668 13.6666 10.1583 13.6666 12V13.6667H0.333252V12C0.333252 10.1583 3.31659 8.66668 6.99992 8.66668Z"
                  fill="#878787"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="title">
          <a href="#" data-testid="btn-create-user" @click="createUser()"
            ><svg-plus /> Adicionar</a
          >
        </div>
        <user-list />
      </div>
      <c-footer />
    </main>
    <c-modal
      v-if="showModal"
      :show-modal.sync="showModal"
      :type-event="typeEvent"
      :toast.sync="toast"
    />
    <c-toast v-if="toast.show" :toast.sync="toast" />
    <div v-if="showMenuMobile" class="menu-mobile">
      <ul>
        <li><a href="#">Candidatos</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['isLogged'],
  data() {
    return {
      typeEvent: '',
      showModal: false,
      hideMenu: false,
      showMenuMobile: false,
      showMenuProfile: false,
      toast: {},
    }
  },
  methods: {
    createUser() {
      this.typeEvent = 'create'
      this.showModal = true
    },
  },
}
</script>
<style lang="scss" scoped>
.showMenuMobile {
  display: flex !important;
  position: absolute !important;
}
.vertical-menu {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 200px;
  height: 100vh;
  background-color: var(--primary);

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    .itens-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      background-color: #005c94;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      a {
        text-decoration: none;
        font-weight: 400;
        font-size: 15px;
        margin-left: 6px;
      }
    }
  }
  .hide-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 6px;
    height: 50px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    a {
      text-decoration: none;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 740px) {
    display: none;
  }

  .hide-menu-mobile {
    display: flex;
    justify-content: end;
    width: 100%;
    padding-top: 10px;
    padding-right: 10px;
  }
}

.vertical-menu.hidden {
  display: none;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 100vh;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 70px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-inline: 25px;

    .btn-menu-mobile {
      cursor: pointer;
      display: none;
      width: 20px;
      height: 20px;
      @media screen and (max-width: 740px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--secondary);

      .show-menu-hidden {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }

      a {
        color: var(--primary);
        font-weight: 700;
        font-size: 22px;
        text-decoration: none;
      }
      @media screen and (max-width: 740px) {
        display: none !important;
      }
    }
    .profile {
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        display: flex;
        align-items: center;
        color: var(--secondary);
        gap: 4px;
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    height: 70px;
    background-color: #fff;
    padding-left: 25px;
    a {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 20px;
      gap: 7px;
      color: var(--primary);
      text-decoration: none;
    }
  }
  @media screen and (max-width: 580px) {
    height: 100%;
  }
}
.menu-mobile {
  top: 6%;
  left: 1%;
  background-color: var(--primary);
  position: absolute;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  ul {
    padding-inline: 15px;
    list-style: none;
    li {
      margin-bottom: 15px;
      margin-top: 15px;
      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
}
</style>
