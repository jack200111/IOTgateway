<!-- 系统 -->
<template>
  <div class="">
    <h1>系统信息</h1>
    <div class="content">
      <p v-for="(item, index) in propArr" :key="index">
        <span class="prop">{{ item.prop }}:</span>
        <span class="prop-value">{{ item.value }}</span>
        <button class="absolute" v-if="item.btn">{{ item.btn }}</button>
      </p>
      <p>
        <span><input type="text" class="inputWidth" /> 分钟无数据时重启</span>
        <button class="absolute">保存</button>
      </p>
      <button class="btn btn1">重启设备</button>
      <button class="btn">恢复出厂</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      propArr: [
        { prop: '设备名称', value: 'gw' },
        { prop: '型号', value: 'Smart182' },
        { prop: '固定版本', value: 'V20059' },
        { prop: '系统版本', value: 'V105' },
        { prop: '内核版本', value: 'L104' },
        { prop: '设备ID', value: 'e46208429f0f402c' },
        { prop: '设备MAC', value: '482b5bf3a234' },
        { prop: '剩余内存', value: '47992kb' },
        { prop: '运行时间', value: '0 days 11:57:50' },
        { prop: 'RTC', value: '2023-04-13 11:16:44', btn: '标准' }
      ]
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
    height: 48px;
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
