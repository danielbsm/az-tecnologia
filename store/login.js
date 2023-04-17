export const state = () => ({
  token: '',
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_EXPIRE_AT(state, payload) {
    state.expireAt = payload
  },
}

export const getters = {
  getToken: (state) => state.token,
}
