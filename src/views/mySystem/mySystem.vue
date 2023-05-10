<!-- 系统 -->
<template>
  <div class="">
    <h1>{{title}}</h1>
    <div class="content">
      <typeAll  cssClass="myP" :typeArray="sysinfo" :title="title" ifProp="RTC时间"></typeAll>
      <!-- RTC时间 -->
      <span cssClass="myP" v-for="(item,index) in sysinfo" :key="index+101">
          <p v-if="item.prop==='RTC时间'" >
          <!-- 输入框 或文本 -->
          <template v-if="item.type === 'text'">
              <span class="prop">{{ item.prop }}:</span>
              <span class="prop-value">{{ item.value }}</span>
          </template>
        </p>
      </span>
      <!-- 按钮 -->
      <!-- <span v-for="item in sysinfo" :key="item.prop">
        <template v-if="item.type === 'button'">
          <button class="btn btn1" @click="getSh(item.value)" >{{ item.prop }}</button>
        </template>
      </span> -->
    <myButton :typeArray="sysinfo" @fn="getSh"></myButton>
    </div>
  </div>
</template>

<script>
import getCurrentTime from '@/utils/getTime'
import myMixin from '@/mixin/getIniData'
import myButton from '@/components/button.vue'
import typeAll from '@/components/typeAll.vue'
export default {
  components: {
    myButton,
    typeAll
  },
  mixins: [myMixin],
  data () {
    return {
      title: '',
      sysinfo: [
      ]
    }
  },
  mounted () {
    this.fetchData('sysinfo')
    setInterval(() => {
      this.sysinfo.forEach(item => {
        if (item.prop === 'RTC时间') {
          item.value = getCurrentTime()
        }
      })
    }, 1000)
  },
  methods: {
    save () {
    }
  }
}
</script>

<style scoped lang="scss">

.content {
  p{
    width: 900px;
    height: 42px;
    line-height: 48px;
    position: relative;
    .prop {
        width: 240px;
        display: inline-block;
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
}
</style>
