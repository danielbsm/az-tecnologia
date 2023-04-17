export const state = () => ({
  page: 0,
})

export const mutations = {
  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const getters = {
  getPage: (state) => state.page,
}
