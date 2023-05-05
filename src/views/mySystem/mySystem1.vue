<!-- 系统 -->
<template>
  <div class="">
    <h1>系统信息</h1>
    <div class="content">
      <p v-for="(item, index) in propArr" :key="index">
        <span class="prop">{{ item.prop }}:</span>
        <span class="prop-value">{{ item.value }}</span>
      </p>
      <p>
        <span class="prop">RTC时间</span>
        <span class="prop-value">{{ RTCTime.value }}</span>
        <button class="absolute" @click="checkTime">{{ RTCTime.btn }}</button>
      </p>
      <button class="btn btn1" @click="pushLogin">重启设备</button>
      <button class="btn btn1" @click="reset">恢复出厂</button>
      <!-- <button class="btn">时间校准</button> -->
    </div>
  </div>
</template>

<script>
import getCurrentTime from '@/utils/getTime'
import http from '@/utils/http'
import router from '@/router'
export default {
  data () {
    return {
      propArr: [
        { prop: '产品型号', value: '', label: 'Model' },
        { prop: '系统版本', value: '', label: 'Version' },
        { prop: '内核版本', value: 'Linux ', label: 'Kernel' },
        { prop: '设备ID', value: '', label: 'Serial' },
        { prop: '以太网MAC', value: '', label: 'LanMAC' },
        { prop: '无线网MAC', value: '1', label: 'WifiMAC' }
      ],
      RTCTime: { prop: 'RTC时间', value: getCurrentTime(), label: '', btn: '时间校准' }
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    setInterval(() => {
      this.RTCTime.value = getCurrentTime()
    }, 1000)
  },
  methods: {
    fetchData () {
      // mySystem.vue
      http.get('/mySystem').then(res => {
        // console.log(res.data.propArr)
        Object.keys(res.data.propArr).forEach((item) => {
          this.propArr.forEach((item2) => {
            if (item === item2.label) {
              item2.value = res.data.propArr[item]
            }
          })
        })
      })
    },
    pushLogin () {
      router.push('/myLogin')
    },
    reset () {
      http.get('/recoverySh').then(res => {
        // console.log(res)
      })
    },
    checkTime () {
      //
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: #0069d6;
  // margin-bottom: 20px;
}
.content {
  p {
    width: 900px;
    border-bottom: 1px solid #ccc;
    height: 42px;
    line-height: 48px;
    position: relative;
    .prop {
      width: 240px;
      display: inline-block;
    }
    .absolute{
      position: absolute;
      left: 420px;
      width: 65px;
      top: 12px;
      height: 24px;
    }
  }
  .inputWidth {
    width: 80px;
  }
  .btn{
    background-color: #6490aa;
    color: #fff;
    width:80px;
    padding:8px;
    border: none;
    margin-top: 10px;
  }
  .btn1{
    margin-right: 10px;
  }
}
</style>
