import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () {
})

// 响应拦截器
axios.interceptors.response(function (response) {
  return response.data ? response.data : {}
}, function () {
})
export default axios
