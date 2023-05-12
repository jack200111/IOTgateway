<!-- 系统 -->
<template>
  <div class="">
    <h1>系统信息</h1>
    <div class="content">
      <span v-for="(item, index) in sysinfo" :key="index">
        <p v-if="item.type !== 'button'&&item.prop!=='RTC时间'">
          <!-- 文本 -->
          <template v-if="item.type === 'text'">
              <span class="prop">{{ item.prop }}:</span>
              <span class="prop-value">{{ item.value }}</span>
              <span class="unit">&nbsp;{{ item.slot }}</span>
          </template>
          <!-- 输入框 -->
          <template v-if="item.type === 'input'">
              <span class="prop">{{ item.prop }}:</span>
              <input type="text" v-model="item.value"/>
              <span class="unit">&nbsp;{{ item.slot }}</span>
          </template>
          <!-- 下拉框 -->
          <template v-if="item.type === 'select'">
            <span class="prop">{{ item.prop }}:</span>
            <select class="select" v-model="item.selected">
              <option
                v-for="(item2, index2) in item.value"
                :key="index2"
                :value="item2"
              >
              <template v-if="item2==='ON' || item2==='OFF'">
                {{ item2==='ON'?'动态':'静态' }}
                </template>
                <template v-else>
                {{ item2}}
                </template>
              </option>
            </select>
          </template>
          <!-- 单选框 -->
          <span v-if="item.type === 'radio'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <span class="radioSpan">
              <span v-for="item2 in item.value" :key="item2" class="radioFlex">
                <input class="radio" type="radio" :value="item2" v-model="item.selected">
                <label >{{ item2 }}</label>
              </span>
            </span>
          </span>
          <!-- 复选框 -->
          <span v-if="item.type === 'checkbox'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <span class="radioFlex">
              <input class="radio" type="checkbox"  v-model="item.value">
            </span>
            <!-- 可删 -->
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </span>
          <!-- 文本域 -->
          <span v-if="item.type === 'textarea'" class="radioDisplay">
              <span class="prop">{{ item.prop }}:</span>
              <textarea  v-model="item.value" class="textarea" placeholder="请输入"/>
              <span class="unit">&nbsp;{{ item.slot }}</span>
          </span>
        </p>
      </span>

      <!-- RTC时间 -->
      <span v-for="(item,index) in sysinfo" :key="index+101">
          <p v-if="item.prop==='RTC时间'">
          <!-- 输入框 或文本 -->
          <template v-if="item.type === 'text'">
              <span class="prop">{{ item.prop }}:</span>
              <span class="prop-value">{{ item.value }}</span>
          </template>
        </p>
      </span>
      <!-- 按钮 -->
      <span v-for="item in sysinfo" :key="item.prop">
        <template v-if="item.type === 'button'">
          <button class="btn btn1" @click="getSh(item.value)" >{{ item.prop }}</button>
        </template>
      </span>
    </div>
  </div>
</template>

<script>
import getCurrentTime from '@/utils/getTime'
import myMixin from '@/mixin/getIniData'
export default {
  mixins: [myMixin],
  data () {
    return {
      sysinfo: [
        { type: 'text', prop: '型号', value: 'GW001', label: 'Model' },
        { type: 'text', prop: '系统版本', value: 'Version V001', label: 'Version' },
        { type: 'text', prop: '内核版本', value: 'Linux 4.4.19', label: 'Kernel' },
        { type: 'text', prop: '设备ID', value: '662aa30f09a2f579', label: 'Serial' },
        { type: 'text', prop: '以太网MAC', value: '112233445566', label: 'LanMAC' },
        { type: 'text', prop: '无线网MAC', value: '2023-05-04 10:03:00', label: 'WifiMAC' },
        { type: 'button', prop: '重启设备', value: '/usr/local/bin/reboot.sh', label: 'WifiMAC' },
        { type: 'button', prop: '恢复出厂', value: '/usr/local/bin/recovery.sh', label: 'WifiMAC' },
        { type: 'button', prop: '时间校准', value: '/usr/local/bin/ntupdate.sh', label: 'WifiMAC' }
      ]
    }
  },
  mounted () {
    setInterval(() => {
      this.sysinfo.forEach(item => {
        if (item.prop === 'RTC时间') {
          item.value = getCurrentTime()
        }
      })
    }, 1000)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
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
