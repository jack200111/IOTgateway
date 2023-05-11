<!-- 系统 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="content">
       <typeAll :typeArray="typeArray" :title="title" ifProp="工作方式"></typeAll>
    </div>
    <div class="content">
      <span v-for="(item, index) in typeArray" :key="index+101">
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
      <span v-for="(item, index) in typeArray" :key="index">
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
    <span v-for="item in typeArray" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="fn(item.value)">
          {{ item.prop }}
        </button>
        <span class="unit">&nbsp;{{ item.slot }}</span>
      </template>
    </span>
  </div>
</template>

<script>
// import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
import typeAll from '@/components/typeAll.vue'
export default {
  props: {
    typeArray: { type: Array, required: true },
    title: { type: String, required: true, default: '' }
  },
  components: {
    typeAll
  },
  mixins: [myMixin],
  //   data () {
  //     return {
  //       title: '',
  //       uart1: [],
  //       oldPort: '',
  //       newPort: ''
  //     }
  //   },
  //   mounted () {
  //     this.fetchData('uart1')
  //   },
  methods: {
    fn (value) {
      this.$emit('fn', value)
    }
  }
//   methods: {
//     // 保存串口
//     async save () {
//       console.log('uart1')
//       await http.post('/uart1', { UART1: this.uart1, title: this.title })
//     }
//   }
}
</script>

<style scoped lang="scss">
.selectMarginRight {
  margin-right: 10px;
}
</style>
