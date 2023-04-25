<!-- 网络 -->
<template>
  <div class="content">
    <h1>zabbix代理</h1>
    <!-- 有线网卡 -->
    <div>
      <p v-for="(item) in zabbixAgent" :key="item.prop">
        <span>{{item.prop}}</span><input type="text"  v-model="item.value" />
      </p>
      <p>
        <span>备注提示</span><textarea v-model="textArea.value"> </textarea>
      </p>
    </div>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
// import toNetwork from '@/config/toNetwork.conf'
import http from '@/utils/http'
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      // zabbixAgent: toNetwork.zabbixAgent,
      // textArea: toNetwork.textArea
      zabbixAgent: [
        {
          prop: '设备名称',
          value: '', // 172.16.128.14
          label: 'HOSTNAME'
        },
        {
          prop: '服务器地址',
          label: 'SERVER',
          value: '' // 172.16.128.13
        },
        {
          prop: '服务端口',
          label: 'PORT',
          value: '' // 10050
        }
      ],
      textArea: {
        prop: '备注提示',
        label: 'TEXTAREA',
        value: '' // 10050
      }// 串口需启用TCPServer+ModbusTCP
    }
  },
  methods: {
    getValue () {
      // router.push('/myHome/mySystem')
    },
    async save () {
      if (confirm('设备重启生效是否继续')) {
        const zabbixAgent = [...this.zabbixAgent, this.textArea]
        console.log(zabbixAgent)
        const res = await http.post('/zabbixAgentPost', { zabbixAgent })
        console.log(res)
      }
    },
    fetchData () {
      http.get('/zabbixAgent').then(res => {
        console.log(res.data.zabbixAgent)
        Object.keys(res.data.zabbixAgent).forEach((item) => {
          this.zabbixAgent.forEach((item2) => {
            if (item === item2.label) {
              console.log(item2)
              item2.value = res.data.zabbixAgent[item]
            }
            if (item === 'TEXTAREA') {
              this.textArea.value = res.data.zabbixAgent.TEXTAREA
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: #0069d6;
  margin-bottom: 20px;
}
// .content {
//   padding: 20px;
// }
.select,
input {
  width: 180px;
  height: 24px;
  outline: none;
  box-sizing: border-box;
}
p {
  margin-bottom: 10px;
}
span {
  width: 140px;
  display: inline-block;
}

 .btn{
      margin-top: 10px;
      padding:8px 16px;
      border: none;
    }
    .btn1{
      background-color: #6490aa;
      color: #fff;
      margin-right: 10px;
    }
</style>
