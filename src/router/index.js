import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
import Home2 from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: Home2
      },
      {
        path: 'commont',
        component: () => import('../views/commont')
      },
      {
        path: 'material',
        component: () => import('../views/material')
      },
      {
        path: 'articles',
        component: () => import('../views/articles')
      },
      {
        path: 'publish', // 发布文章
        component: () => import('../views/publish')
      },
      {
        path: 'publish/:articleId', // 修改文章
        component: () => import('../views/publish')
      },
      {
        path: 'account', // 账户信息
        component: () => import('../views/account')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
