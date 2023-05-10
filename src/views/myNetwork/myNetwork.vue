<!-- 系统 -->
<template>
  <div>
    <div class="display">
      <!-- 有线网卡 -->
      <div class="left">
        <h1>{{ title }}</h1>
        <div class="content">
          <!-- 动静态 -->
          <netOrWifi :typeArrayName="netconfig" @fn="IsDisableFn"></netOrWifi>
          <typeAll
            :typeArray="netconfig"
            :title="title"
            :isDisable="netconfigDisable"
          ></typeAll>
        </div>
      </div>
      <!-- 无线网卡 -->
      <div>
        <h1>{{ title2 }}</h1>
        {{  }}
        <div class="content">
          <!-- 动静态 -->
          <netOrWifi :typeArrayName="wificonfig" @fn="IsDisableFn2"></netOrWifi>
          <typeAll
            :typeArray="wificonfig"
            :title="title"
            :isDisable="wificonfigDisable"
          ></typeAll>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <myButton :typeArray="netconfig" @fn2="getSh"></myButton>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
import typeAll from '@/components/typeAll.vue'
import netOrWifi from '@/components/netOrWifi.vue'
import myButton from '@/components/button.vue'
export default {
  components: {
    typeAll,
    netOrWifi,
    myButton
  },
  mixins: [myMixin],
  data () {
    return {
      title: '',
      title2: '',
      netconfig: [],
      wificonfig: [],
      netconfigDisable: false,
      wificonfigDisable: true
    }
  },
  mounted () {
    this.fetchData('netconfig')
    this.fetchData('wificonfig')
  },
  methods: {
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 写入
        await http.post('/netconfig', {
          netconfig: this.netconfig,
          title: this.title
        })
        await http.post('/wificonfig', {
          wificonfig: this.wificonfig,
          title: this.title2
        })
      }
    },
    getSh (value, item) {
      if (item.prop === '保存及应用') {
        this.save()
      }
      if (item.prop === '扫描') {
        // 获取SSID
        http
          .get('/getTmp') // 发送GET请求
          .then((res) => {
            const data = res.data[Object.keys(res.data)]
            Object.keys(data).forEach((item) => {
              const valueArr = data[item].split(',')
              this.wificonfig.forEach((item2) => {
                if (item2.prop === 'SSID') {
                  item2.value = valueArr.slice(2, valueArr.length - 1)
                  item2.selected = valueArr[1]
                  item2.slot =
                    valueArr[valueArr.length - 1] &&
                    valueArr[valueArr.length - 1]
                }
              })
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
      http.post('/postSh', { value }).then((res) => {})
    },
    IsDisableFn (item) {
      if (item.selected === 'ON') {
        // 动态 禁用
        this.netconfigDisable = true
      } else {
        this.netconfigDisable = false
      }
    },
    IsDisableFn2 (item) {
      if (item.selected === 'ON') {
        // 动态 禁用
        this.wificonfigDisable = true
      } else {
        this.wificonfigDisable = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.display {
  display: flex;
}
.left {
  margin-right: 80px;
}
</style>
