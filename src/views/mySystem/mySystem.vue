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
      <!-- <p>
        <span><input type="text" class="inputWidth" /> 分钟无数据时重启</span>
        <button class="absolute">保存</button>
      </p> -->
      <button class="btn btn1">重启设备</button>
      <button class="btn btn1">恢复出厂</button>
      <button class="btn">时间校准</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      propArr: [
        { prop: '设备名称', value: 'gw', label: '1' },
        { prop: '型号', value: 'GW001', label: 'Model' },
        { prop: '系统版本', value: 'V001', label: 'Version' },
        { prop: '内核版本', value: 'Linux 4.4.19', label: 'Kernel' },
        { prop: '设备ID', value: '662aa30f09a2f579', label: 'Serial' },
        { prop: '以太网MAC', value: '112233445566', label: 'LanMAC' },
        { prop: '无线网MAC', value: '', label: 'WifiMAC' },
        { prop: 'RTC时间', value: '', label: '' }
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
