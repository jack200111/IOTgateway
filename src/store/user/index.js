export default {
  namespace: true,
  state: {
    user: '',
    password: '',
    iniData: {}
  },
  getters: {},
  mutations: {
    changeUser (state, payload) {
      state.user = payload
    },
    changePassword (state, payload) {
      state.password = payload
    },
    changeIniData (state, payload) {
      state.iniData = payload
    }
  },
  actions: {},
  modules: {}
}
