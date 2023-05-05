<template>
  <div class="">
    <!-- zabbix代理 -->
    <div>
      <h1 class="absolute">zabbix代理</h1>
      <p v-for="(item, index) in zabbixAgent" :key="index" >
        <!-- 输入框 或文本 -->
        <template v-if="!item.selected">
          <span class="">{{ item.prop }}:</span>
          <span class="tip" v-if="item.prop==='备注提示'">{{ item.value }}</span>
          <input type="text" v-model="item.value" v-else/>
        </template>
        <!-- 下拉框 -->
        <template v-else>
          <span class="prop">{{ item.prop }}:</span>
          <select class="select" v-model="item.selected">
            <option
              v-for="(item2, index2) in item.value"
              :key="index2"
              :value="item2"
            >
              {{ item2}}
            </option>
          </select>
        </template>
      </p>
      <button @click="save" class="btn btn1">保存及应用</button>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
export default {
  mixins: [myMixin],
  created () {
    this.fetchData('zabbixAgent')
    console.log(this.$route.meta.title)
  },
  data () {
    return {
      zabbixAgent: []
    }
  },
  methods: {
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 写入
        const zabbixAgent = this.zabbixAgent
        await http.post('/zabbixAgentPost', { zabbixAgent })
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
      white-space: nowrap;
    }
</style>
