export default {
  namespace: true,
  state: {
    routerArr: [{
      path: 'mySystem',
      name: 'mySystem',
      meta: {
        title: '系统'
      },
      component: () => import('@/views/mySystem/mySystem.vue')
    },
    {
      path: 'myNetwork',
      name: 'myNetwork',
      meta: {
        title: '网络'
      },
      component: () => import('@/views/myNetwork/myNetwork.vue')
    },
    {
      path: 'serialPort',
      name: 'serialPort',
      meta: {
        title: '串口'
      },
      component: () => import('@/views/serialPort/serialPort.vue')
    },
    {
      path: 'toNetwork',
      name: 'toNetwork',
      meta: {
        title: '转接口'
      },
      component: () => import('@/views/toNetwork/toNetwork.vue')
    },
    {
      path: 'passWord',
      name: 'passWord',
      meta: {
        title: '密码'
      },
      component: () => import('@/views/passWord/passWord.vue')
    }]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}
