import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
console.log(store.state.routerArr.routerArr)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'myLogin',
    component: () => import('@/views/myLogin/myLogin.vue')
  },
  {
    path: '/myLogin',
    name: 'myLogin',
    component: () => import('@/views/myLogin/myLogin.vue')
  },
  {
    path: '/myHome',
    name: 'myHome',
    component: () => import('@/views/myHome/myHome.vue'),
    children: [...store.state.routerArr.routerArr]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
