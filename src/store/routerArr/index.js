export default {
  namespace: true,
  state: {
    routerArr: [
      {
        path: 'sysinfo',
        name: 'sysinfo',
        meta: {
          title: '系统信息'
        },
        component: () => import('@/views/mySystem/mySystem.vue')
      },
      {
        path: 'netconfig',
        name: 'netconfig',
        meta: {
          title: '网络设置'
        },
        component: () => import('@/views/myNetwork/myNetwork.vue')
      },
      {
        path: '/myHome/serialPort',
        name: 'serialPort',
        meta: {
          title: '串口转网络'
        },
        component: () => import('@/views/serialPort/serialPort.vue'),
        children: [
          {
            path: 'uart1',
            name: 'uart1',
            meta: {
              title: '串口1'
            },
            component: () => import('@/views/serialPort/serialPort1/serialPort1.vue')
          },
          {
            path: 'uart2',
            name: 'uart2',
            meta: {
              title: '串口2'
            },
            component: () => import('@/views/serialPort/serialPort2/serialPort2.vue')
          },
          {
            path: 'uart3',
            name: 'uart3',
            meta: {
              title: '串口3'
            },
            component: () => import('@/views/serialPort/serialPort3/serialPort3.vue')
          },
          {
            path: 'uart4',
            name: 'uart4',
            meta: {
              title: '串口4'
            },
            component: () => import('@/views/serialPort/serialPort4/serialPort4.vue')
          }
        ]
      },
      {
        path: 'toNetwork',
        name: 'toNetwork',
        meta: {
          title: 'zabbix代理'
        },
        component: () => import('@/views/toNetwork/toNetwork.vue')
      },
      {
        path: 'passWord',
        name: 'passWord',
        meta: {
          title: '密码设置'
        },
        component: () => import('@/views/passWord/passWord.vue')
      }
    ]
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
}
