import aside from '../components/home/aside.vue'
import layheader from '../components/home/header.vue'
export default {
  install (Vue) {
    Vue.component('asided', aside)
    Vue.component('headers', layheader)
  }
}
