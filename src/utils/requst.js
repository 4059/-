import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import jsonBigint from 'json-bigint'

axios.defaults.transformResponse = [
  function (data) {
    return jsonBigint.parse(data)
  }
]

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () {
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400 :
      message = '请求参数错误'
      break
    case 507 :
      message = '服务器数据异常'
      break
    case 401 :
      router.push('/login')
      break
    case 403 :
      message = '没有设置这条评论的权限'
      break
    default :
      break
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)
})
export default axios
