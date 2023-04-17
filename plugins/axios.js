export default function ({ $axios, $config }, inject) {
  const { API_BASE_URL } = $config
  const azTecnologiaAPI = $axios.create({
    baseURL: API_BASE_URL,
  })

  azTecnologiaAPI.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  inject('azTecnologiaAPI', azTecnologiaAPI)
}
