import Vue from 'vue'
import Vuex from 'vuex'
import routerArr from './routerArr'
import user from './user'
import pathAll from './pathAll'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    routerArr,
    user,
    pathAll
  }
})
