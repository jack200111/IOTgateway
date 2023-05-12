<!-- 系统 -->
<template>
  <div>
    <div class="display">
      <div class="left">
        <h1>{{ title }}</h1>
        <div class="content">
          <span v-for="(item, index) in netconfig" :key="index+101">
            <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
              <!-- 下拉框 -->
              <template v-if="item.type === 'select'">
                <span class="prop">{{ item.prop }}:</span>
                <select class="select" v-model="item.selected" @change="IsDisable(item)">
                  <option
                    v-for="(item2, index2) in item.value"
                    :key="index2"
                    :value="item2"
                  >
                    <template v-if="item2 === 'ON' || item2 === 'OFF'">
                      {{ item2 === 'ON' ? '动态' : '静态' }}
                    </template>
                    <template v-else>
                      {{ item2 }}
                    </template>
                  </option>
                </select>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
            </p>
          </span>
          <span v-for="(item, index) in netconfig" :key="index">
            <p v-if="item.type !== 'button' && item.prop !== 'IP类型'">
              <!-- 文本 -->
              <template v-if="item.type === 'text'">
                <span class="prop">{{ item.prop }}:</span>
                <span class="prop-value">{{ item.value }}</span>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <span class="prop">{{ item.prop }}:</span>
                <input type="text" v-model="item.value" :disabled="netconfigDisable"/>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 下拉框 -->
              <template v-if="item.type === 'select'">
                <span class="prop">{{ item.prop }}:</span>
                <select class="select" v-model="item.selected" :disabled="netconfigDisable">
                  <option
                    v-for="(item2, index2) in item.value"
                    :key="index2"
                    :value="item2"
                  >
                    <template v-if="item2 === 'ON' || item2 === 'OFF'">
                      {{ item2 === 'ON' ? '动态' : '静态' }}
                    </template>
                    <template v-else>
                      {{ item2 }}
                    </template>
                  </option>
                </select>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 单选框 -->
              <span v-if="item.type === 'radio'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <span class="radioSpan">
                  <span
                    v-for="item2 in item.value"
                    :key="item2"
                    class="radioFlex"
                  >
                    <input
                      class="radio"
                      type="radio"
                      :value="item2"
                      v-model="item.selected"
                      :disabled="netconfigDisable"
                    />
                    <label>{{ item2 }}</label>
                  </span>
                </span>
              </span>
              <!-- 复选框 -->
              <span v-if="item.type === 'checkbox'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <span class="radioFlex">
                  <input class="radio" type="checkbox" v-model="item.value" :disabled="netconfigDisable"/>
                </span>
                <!-- 可删 -->
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </span>
              <!-- 文本域 -->
              <span v-if="item.type === 'textarea'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <textarea
                  v-model="item.value"
                  class="textarea"
                  :disabled="netconfigDisable"
                  placeholder="请输入"
                />
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </span>
            </p>
          </span>
        </div>
      </div>
      <div>
        <h1>{{ title2 }}</h1>
        <div class="content">
          <span v-for="(item, index) in wificonfig" :key="index+101">
            <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
              <!-- 下拉框 -->
              <template v-if="item.type === 'select'">
                <span class="prop">{{ item.prop }}:</span>
                <select class="select" v-model="item.selected" @change="IsDisable(item)">
                  <option
                    v-for="(item2, index2) in item.value"
                    :key="index2"
                    :value="item2"
                  >
                    <template v-if="item2 === 'ON' || item2 === 'OFF'">
                      {{ item2 === 'ON' ? '动态' : '静态' }}
                    </template>
                    <template v-else>
                      {{ item2 }}
                    </template>
                  </option>
                </select>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
            </p>
          </span>
          <span v-for="(item, index) in wificonfig" :key="index">
            <p v-if="item.type !== 'button' && item.prop !== 'IP类型'">
              <!-- 文本 -->
              <template v-if="item.type === 'text'">
                <span class="prop">{{ item.prop }}:</span>
                <span class="prop-value">{{ item.value }}</span>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <span class="prop">{{ item.prop }}:</span>
                <input :type="item.prop === '密码'?'password':'text'" v-model="item.value" :disabled="wificonfigDisable"/>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 下拉框 -->
              <template v-if="item.type === 'select'">
                <span class="prop">{{ item.prop }}:</span>
                <select class="select" v-model="item.selected" :disabled="wificonfigDisable">
                  <option
                    v-for="(item2, index2) in item.value"
                    :key="index2"
                    :value="item2"
                  >
                    <template v-if="item2 === 'ON' || item2 === 'OFF'">
                      {{ item2 === 'ON' ? '动态' : '静态' }}
                    </template>
                    <template v-else>
                      {{ item2 }}
                    </template>
                  </option>
                </select>
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </template>
              <!-- 单选框 -->
              <span v-if="item.type === 'radio'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <span class="radioSpan">
                  <span
                    v-for="item2 in item.value"
                    :key="item2"
                    class="radioFlex"
                  >
                    <input
                      class="radio"
                      type="radio"
                      :value="item2"
                      v-model="item.selected"
                      :disabled="wificonfigDisable"
                    />
                    <label>{{ item2 }}</label>
                  </span>
                </span>
              </span>
              <!-- 复选框 -->
              <span v-if="item.type === 'checkbox'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <span class="radioFlex">
                  <input class="radio" type="checkbox" v-model="item.value" :disabled="wificonfigDisable"/>
                </span>
                <!-- 可删 -->
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </span>
              <!-- 文本域 -->
              <span v-if="item.type === 'textarea'" class="radioDisplay">
                <span class="prop">{{ item.prop }}:</span>
                <textarea
                  v-model="item.value"
                  class="textarea"
                  placeholder="请输入"
                  :disabled="wificonfigDisable"
                />
                <span class="unit">&nbsp;{{ item.slot }}</span>
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <span v-for="item in netconfig" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh(item.value, item)">
          {{ item.prop }}
        </button>
        <span class="unit">&nbsp;{{ item.slot }}</span>
      </template>
    </span>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
export default {
  mixins: [myMixin],
  data () {
    return {
      title: '有限网卡',
      title2: '无限网卡',
      netconfig: [
        { prop: 'IP地址', value: '172.16.128.14', type: 'input', slot: '' },
        { prop: '子网掩码', value: '255.255.255.0', type: 'input', slot: '' },
        { prop: '网关', value: '172.16.128.254', type: 'input', slot: '' },
        { prop: 'DNS', value: '114.114.114.114', type: 'input', slot: '' },
        {
          prop: 'IP类型',
          value: ['OFF', 'ON'],
          type: 'select',
          selected: 'ON',
          slot: ''
        },
        {
          prop: '扫描',
          value: '/usr/local/bin/iwscan.sh',
          type: 'button',
          slot: ''
        },
        {
          prop: '保存及应用',
          value: '/usr/local/bin/netsave.sh',
          type: 'button',
          slot: ''
        }
      ],
      wificonfig: [
        { prop: 'IP地址', value: '172.16.128.14', type: 'input', slot: '' },
        { prop: '子网掩码', value: '255.255.255.0', type: 'input', slot: '' },
        { prop: '网关', value: '172.16.128.254', type: 'input', slot: '' },
        { prop: 'DNS', value: '114.114.114.114', type: 'input', slot: '' },
        {
          prop: 'IP类型',
          value: ['OFF', 'ON'],
          type: 'select',
          selected: 'OFF',
          slot: ''
        },
        {
          prop: 'SSID',
          value: ['keji'],
          type: 'select',
          selected: 'keji',
          slot: ''
        },
        { prop: '密码', value: '21680186', type: 'input', slot: '' }
      ],
      netconfigDisable: false,
      wificonfigDisable: false
    }
  },
  mounted () {
    // this.fetchData('netconfig')
    // this.fetchData('wificonfig')
  },
  methods: {
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 写入
        await http.post('/netconfig', { netconfig: this.netconfig, title: this.title })
        await http.post('/wificonfig', { wificonfig: this.wificonfig, title: this.title2 })
      }
    },
    getSh (value, item) {
      if (item.prop === '保存及应用') {
        this.save()
      }
      if (item.prop === '扫描') {
        // 获取SSID
        http.get('/getTmp') // 发送GET请求
          .then(res => {
            const data = res.data[Object.keys(res.data)]
            Object.keys(data).forEach((item) => {
              const valueArr = data[item].split(',')
              this.wificonfig.forEach(item2 => {
                if (item2.prop === 'SSID') {
                  item2.value = valueArr.slice(2, valueArr.length - 1)
                  item2.selected = valueArr[1]
                  item2.slot = valueArr[valueArr.length - 1] && valueArr[valueArr.length - 1]
                }
              })
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    IsDisable (item) {
      console.log(item.selected)
      if (item.selected === 'ON') {
        // 动态 禁用
        this.netconfigDisable = true
      } else {
        this.netconfigDisable = false
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
