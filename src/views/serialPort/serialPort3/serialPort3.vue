<!-- 系统 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="content">
      <span v-for="(item, index) in uart3" :key="index">
        <p v-if="item.type !== 'button' && item.prop !== '工作方式'">
          <!-- 文本 -->
          <template v-if="item.type === 'text'">
            <span class="prop">{{ item.prop }}:</span>
            <span class="prop-value">{{ item.value }}</span>
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </template>
          <!-- 输入框 -->
          <template v-if="item.type === 'input'">
            <span class="prop">{{ item.prop }}:</span>
            <input type="text" v-model="item.value" />
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
                />
                <label>{{ item2 }}</label>
              </span>
            </span>
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </span>
          <!-- 复选框 -->
          <span v-if="item.type === 'checkbox'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <span class="radioFlex">
              <input class="radio" type="checkbox" v-model="item.value" />
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
            />
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </span>
        </p>
      </span>
    </div>
    <div class="content">
      <span v-for="(item, index) in uart3" :key="index+101">
        <p v-if="item.type !== 'button' && item.prop === '工作方式'">
          <!-- 下拉框 -->
          <span>
            <span class="prop">{{ item.prop }}:</span>
            <!-- 工作方式 第一个下拉框 -->
            <span class="inlineBlockDiv">
              <select
                class="select selectMarginRight"
                v-model="item.value[0].selected"
                @change="onCountryChange(item)"
              >
                <option
                  v-for="(item2, index2) in item.value[0].value"
                  :key="index2"
                  :value="item2"
                >
                  {{ item2 }}
                </option>
              </select>
              <span class="unit" v-if="item.value[0].slot"
                >&nbsp;{{ SelectProp[0].slot }}</span
              >
            </span>
            <!-- 工作方式 第二个下拉框 -->
            <span class="inlineBlockDiv">
              <select
                class="select selectMarginRight"
                v-model="item.value[1].selected"
              >
                <option
                  v-for="(item2, index2) in item.value[1].value"
                  :key="index2"
                  :value="item2"
                >
                  {{ item2 }}
                </option>
              </select>
              <span class="unit">&nbsp;{{ item.value[1].slot }}</span>
            </span>
          </span>
          <template v-if="item.type === 'select' && item.prop !== '工作方式'">
            <span class="prop">{{ item.prop }}:</span>
            <select class="select" v-model="item.selected">
              <option
                v-for="(item2, index2) in item.value"
                :key="index2"
                :value="item2"
              >
                  {{ item2 }}
              </option>
            </select>
          </template>
        </p>
      </span>
    </div>
    <div class="content">
      <span v-for="(item, index) in uart3" :key="index">
        <p v-if="item.type !== 'button' && item.prop !== '工作方式'">
          <!-- 小输入框 -->
             <template v-if="item.type === 'smallInput'">
            <span class="prop">{{ item.prop }}:</span>
            <input style="width:65px" type="text" v-model="item.value" @change="changePort(item.value)"/>
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </template>
        </p>
      </span>
    </div>
    <!-- 按钮 -->
    <span v-for="item in uart3" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh2(item.value)">
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
      title: '串口3',
      uart3: [
        {
          prop: '波特率',
          value: '115200',
          type: 'input',
          slot: '(600-921600)bps'
        },
        {
          prop: '数据位',
          value: ['8', '6'],
          type: 'select',
          selected: '8',
          slot: 'bit'
        },
        {
          prop: '校验位',
          value: ['None', 'Even', 'Odd'],
          type: 'select',
          selected: 'None',
          slot: ''
        },
        {
          prop: '停止位',
          value: ['1', '2'],
          type: 'select',
          selected: '1',
          slot: ''
        },
        { prop: '当前串口模式', value: 'RS485', type: 'text', slot: '' },
        {
          prop: '流控模式',
          value: ['None', 'XON/XOFF'],
          type: 'select',
          selected: 'None',
          slot: ''
        },
        {
          prop: '本地端口',
          value: '1032',
          type: 'smallInput',
          slot: '(1~65535)'
        },
        {
          prop: '保存及应用',
          value: '/usr/local/bin/uart1save.sh',
          type: 'button',
          slot: ''
        }
      ],
      oldPort: '',
      newPort: ''
    }
  },
  mounted () {
    // this.fetchData('uart3')
  },
  methods: {
    async save () {
      await http.post('/uart3', { UART3: this.uart3, title: this.title })
    }
  }
}
</script>

<style scoped lang="scss">
.selectMarginRight {
  margin-right: 10px;
}
</style>
