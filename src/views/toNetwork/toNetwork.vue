<template>
  <div class="">
    <!-- zabbix代理 -->
    <div>
      <h1 class="absolute">zabbix代理</h1>
      <p v-for="(item) in zabbixAgent" :key="item.prop">
        <span>{{item.prop}}</span><input type="text"  v-model="item.value" />
      </p>
      <p class="tip">
        <span class="tip_span">备注提示</span><textarea v-model="textArea.value"> </textarea>
      </p>
      <button @click="save" class="btn btn1">保存及应用</button>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
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
        value: '' // 串口需启用TCPServer+ModbusTCP
      }
    }
  },
  methods: {
    async save () {
      if (confirm('设备重启生效是否继续')) {
        const zabbixAgent = [...this.zabbixAgent, this.textArea]
        // console.log(zabbixAgent)
        // 写入
        await http.post('/zabbixAgentPost', { zabbixAgent })
      }
    },
    fetchData () {
      // 请求数据
      http.get('/zabbixAgent').then(res => {
        Object.keys(res.data.zabbixAgent).forEach((item) => {
          this.zabbixAgent.forEach((item2) => {
            // 输入项
            if (item === item2.label) {
              item2.value = res.data.zabbixAgent[item]
            }
            // 备注
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
// .absolute{
//   position: absolute;
//   left: 10px;
// }
.bg {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
}
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
  .tip {
    display: flex;
      // .tip_span{
      //   height: 40px;
      //   display: inline-block;
      //   line-height: 40px;
      // }
      textarea{
        min-width: 180px;
        min-height: 60px;
      }
  }
</style>
