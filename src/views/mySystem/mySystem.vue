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
        <span class="prop">RTCTime:</span>
        <span class="prop-value">{{ RTCTime.value }}</span>
        <button class="absolute" @click="checkTime">{{ RTCTime.btn }}</button>
      </p>
      <!-- <p>
        <span><input type="text" class="inputWidth" /> 分钟无数据时重启</span>
        <button class="absolute">保存</button>
      </p> -->
      <button class="btn btn1" @click="pushLogin">重启设备</button>
      <button class="btn btn1" @click="reset">恢复出厂</button>
      <!-- <button class="btn">时间校准</button> -->
    </div>
  </div>
</template>

<script>
// import config from '@/config/sysinfo.conf'
import getCurrentTime from '@/utils/getTime'
import axios from 'axios'
import router from '@/router'
export default {
  data () {
    return {
      propArr: [
        { prop: '型号', value: '', label: 'Model' },
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
    checkTime () {
      // getCurrentTime()
      // alert('校准成功')
    },
    fetchData () {
      // const xhr = new XMLHttpRequest()
      // xhr.open('GET', '../../../src/config/netconfig.conf', true) // 请求的URL地址
      // xhr.responseType = 'text' // 返回类型为文本
      // xhr.onload = function () {
      //   if (xhr.status === 200) { // 成功
      //     let iniData = xhr.responseText // 获取到的文本数据
      //     // 处理中文字符
      //     iniData = decodeURIComponent(escape(iniData))
      //     // 其他处理逻辑...
      //     console.log(iniData)
      //   } else { // 失败
      //     console.log('获取ini文件失败')
      //   }
      // }
      // // 解决跨域问题
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      // xhr.send() // 发送请求
      // axios.get('../../../src/user/local/bin/recovery.sh').then(response => {
      // console.log(response.data)
      // const data = JSON.parse(response.data)
      // this.name = data.name
      // this.age = data.age
      // })
      // mySystem.vue
      axios.get('http://localhost:3000/mySystem').then(res => {
        console.log(res.data.propArr)
        Object.keys(res.data.propArr).forEach((item) => {
          this.propArr.forEach((item2) => {
            if (item === item2.label) {
              item2.value = res.data.propArr[item]
            }
          })
        })
      })
      // axios.post('http://localhost:3000/run-script')
      //   .then(result => console.log(result, 1))
      // // .then(response => response.text())
      //   .catch(error => console.error(error))
      // // axios.get('http://localhost:3001/getData').then(response => {
      // //   console.log(response.data)
      // // })
    },
    pushLogin () {
      // this.fetchData()
      router.push('/myLogin')
    },
    reset () {
      // this.fetchData()
      // router.push('/myLogin')
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
