<!-- 系统 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="content">
      <span v-for="(item, index) in serialPort4" :key="index">
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
      <span v-for="(item, index) in serialPort4" :key="index+101">
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
      <span v-for="(item, index) in serialPort4" :key="index">
        <p v-if="item.type !== 'button' && item.prop !== '工作方式'">
          <!-- 小输入框 -->
             <template v-if="item.type === 'smallInput'">
            <span class="prop">{{ item.prop }}:</span>
            <input style="width:65px" type="text" v-model="item.value" />
            <span class="unit">&nbsp;{{ item.slot }}</span>
          </template>
        </p>
      </span>
    </div>
    <!-- 按钮 -->
    <span v-for="item in serialPort4" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh(item.value)">
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
      title: '',
      serialPort4: []
    }
  },
  mounted () {
    this.fetchData('serialPort4')
  },
  methods: {
    async save () {
      await http.post('/serialPost4', { UART3: this.serialPort4, title: this.title })
    },
    onCountryChange (item) {
      const valueArr = item.value
      if (valueArr[0].selected === 'TCPServer') {
        valueArr[1].value = ['None', 'ModbusTCP']
      } else if (valueArr[0].selected === 'Websocket') {
        valueArr[1].value = ['None']
      }
    }
  }
}
</script>

<style scoped lang="scss">
.selectMarginRight {
  margin-right: 10px;
}
</style>
