import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
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
router.beforeEach((to, from, next) => {
  if (to.fullPath && !from.fullPath) {
    next(to.fullPath)
  }
  // console.log(to, from)
  // 登录页直接跳转
  // if (to.path === '/login') {
  //   next()
  //   // 回到登录页面,清除路由、当前登录人等信息
  //   // 非登录页面需要校验是否已登录、是否页面刷新
  // } else {
  //   // 未登录时跳转至登录页面
  //   // 页面刷新,需要重新挂载路由
  // }
  next()
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch((error) => error)
}

export default router
