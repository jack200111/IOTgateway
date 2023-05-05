<!-- 系统 -->
<template>
  <div class="">
    <h1>系统信息</h1>
    <div class="content">
      <p v-for="(item, index) in sysinfo" :key="index">
        <!-- 输入框 或文本 -->
        <template v-if="!item.selected">
          <span class="prop">{{ item.prop }}:</span>
          <span class="prop-value">{{ item.value }}</span>
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
            <template v-if="item2==='ON'&&item2==='OFF'">
              {{ item2==='ON'?'动态':'静态' }}
              </template>
               <template v-else>
              {{ item2}}
              </template>
            </option>
          </select>
        </template>
      </p>
      <!-- 系统时间 -->
      <p>
        <span class="prop">RTC时间</span>
        <span class="prop-value">{{ RTCTime.value }}</span>
        <button class="absolute" @click="checkTime">{{ RTCTime.btn }}</button>
      </p>
      <!-- 按钮 -->
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
      sysinfo: [
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
      // console.log(res.data.sysinfo)
      // console.log(this.sysinfo)
      // console.log(Object.keys(res.data.sysinfo))
      http.get('/mySystem').then(res => {
        Object.keys(res.data.sysinfo).forEach((item) => {
          const value = res.data.sysinfo[item]
          if (value.split(',').length > 2) {
            this.sysinfo.push({ prop: item, value: value.split(',').splice(1), selected: value.split(',')[1], label: value.split(',')[0] })
          } else {
            this.sysinfo.push({ prop: item, value: value.split(',').splice(1).join(''), label: value.split(',')[0] })
          }

        // console.log({ prop: item, value: value.split(','), selected: value.split(',')[0] })
        // 如果不删除，只添加
        // const arr = []
        //   this.sysinfo.forEach((item2) => {
        //     if (item === item2.prop) {
        //       arr.push(item)
        //       item2.value = res.data.sysinfo[item]
        //     }
        //   })
        //   this.sysinfo.forEach((item2) => {
        //     if (!arr.includes(item)) {
        //       arr.push(item)
        //       this.sysinfo.push({ prop: item, value: res.data.sysinfo[item] })
        //     }
        //   })
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
.select,
input {
  width: 180px;
  height: 24px;
  outline: none;
  box-sizing: border-box;
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
