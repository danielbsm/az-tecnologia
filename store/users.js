export const state = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload
  },
  SET_USER(state, payload) {
    state.users.push(payload)
  },
  REMOVE_USER(state, index) {
    state.users.splice(index, 1)
  },
  UPDATE_USER(state, payload) {
    state.users[payload.index].first_name = payload.firstName
  },
}

export const getters = {
  getUsers: (state) => state.users,
}

export const actions = {
  removeUser({ state, commit }, userId) {
    const index = state.users.findIndex((user) => user.id === userId)
    if (index !== -1) {
      commit('REMOVE_USER', index)
    }
  },
  updateUser({ state, commit }, payload) {
    const index = state.users.findIndex((user) => user.id === payload.userId)
    if (index !== -1) {
      commit('UPDATE_USER', {
        index,
        ...payload,
      })
    }
  },
}
