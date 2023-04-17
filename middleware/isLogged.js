export default ({ store, redirect }) => {
  if (!store.getters['login/getToken']) {
    redirect('/login')
  }
}
