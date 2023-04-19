<!-- 网络 -->
<template>
  <div class="content">
    <h1>zabbix代理</h1>
    <!-- 有线网卡 -->
    <div>
      <p v-for="(item) in inputArr" :key="item.prop">
        <span>{{item.prop}}</span><input type="text"  :value="item.value" />
      </p>
      <p>
        <span>备注提示</span><textarea v-model="textArea"> </textarea>
      </p>
    </div>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputArr: [
        {
          prop: '设备名称',
          value: '172.16.128.14',
          label: 'HOSTNAME'
        },
        {
          prop: '服务器地址',
          label: 'SERVER',
          value: '172.16.128.13'
        },
        {
          prop: '服务端口',
          label: 'PORT',
          value: '10050'
        }
      ],
      textArea: '串口需启用TCPServer+ModbusTCP'
    }
  },
  methods: {
    getValue () {
      // router.push('/myHome/mySystem')
    },
    save () {
      confirm('设备重启生效是否继续')
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
