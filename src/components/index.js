import aside from '../components/home/aside.vue'
import layheader from '../components/home/header.vue'
import breadCrumb from '../common/bread-crumb.vue'

export default {
  install (Vue) {
    Vue.component('asided', aside)
    Vue.component('headers', layheader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
