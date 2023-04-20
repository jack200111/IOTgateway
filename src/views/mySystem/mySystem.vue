<!-- 系统 -->
<template>
  <div class="">
    <h1>系统信息</h1>
    <div class="content">
      <p v-for="(item, index) in propArr" :key="index">
        <span class="prop">{{ item.prop }}:</span>
        <span class="prop-value">{{ item.value }}</span>
        <!-- <button class="absolute" v-if="item.btn">{{ item.btn }}</button> -->
      </p>
      <p>
        <span class="prop">RTCTime:</span>
        <span class="prop-value">{{ RTCTime.value }}</span>
      </p>
      <!-- <p>
        <span><input type="text" class="inputWidth" /> 分钟无数据时重启</span>
        <button class="absolute">保存</button>
      </p> -->
      <button class="btn btn1">重启设备</button>
      <button class="btn btn1" @click="reset">恢复出厂</button>
      <button class="btn">时间校准</button>
    </div>
  </div>
</template>

<script>
import config from '@/config/sysinfo.conf'
import getCurrentTime from '@/utils/getTime'
import axios from 'axios'
export default {
  data () {
    return {
      propArr: config,
      RTCTime: { prop: 'RTC时间', value: getCurrentTime(), label: '' }
    }
  },
  mounted () {
    setInterval(() => {
      this.RTCTime.value = getCurrentTime()
    }, 1000)
    this.fetchData()
  },
  methods: {
    fetchData () {
      // const xhr = new XMLHttpRequest()
      // xhr.open('GET', '/src/user/local/bin/recovery.sh')
      // xhr.onload = () => {
      //   this.data = xhr.responseText
      // }
      // xhr.send()

      // axios.get('/src/user/local/bin/recovery.sh').then(response => {
      // console.log(response.data)
      // const data = JSON.parse(response.data)
      // this.name = data.name
      // this.age = data.age
      // })
      //
      // mySystem.vue
      axios.get('http://localhost:3000/api/data').then(response => {
        console.log(response.data)
      })
      axios.get('http://localhost:3000/api/run-script')
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.error(error))
      axios.get('http://localhost:3000/api/getData').then(response => {
        console.log(response.data)
      })
    },
    reset () {
      this.fetchData()
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
      left: 440px;
      width: 40px;
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
