import aside from '../components/home/aside.vue'
import layheader from '../components/home/header.vue'
import breadCrumb from '../common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('asided', aside) // 侧边栏注册
    Vue.component('headers', layheader) // 头部注册
    Vue.component('bread-crumb', breadCrumb) // 面包屑组件注册
    Vue.component('quill-editor', quillEditor)
  }
}
