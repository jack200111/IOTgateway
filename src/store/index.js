import Vue from 'vue'
import Vuex from 'vuex'
import routerArr from './routerArr'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    routerArr,
    user
  }
})
