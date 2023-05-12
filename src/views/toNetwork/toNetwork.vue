<!-- 系统 -->
<template>
  <div>
    <h1>{{ title }}</h1>
        <div class="content">
          <span v-for="(item, index) in zabbixAgent" :key="index+101">
            <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
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
              </template>
            </p>
          </span>
          <span v-for="(item, index) in zabbixAgent" :key="index">
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
    <!-- 按钮 -->
    <span v-for="item in zabbixAgent" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh(item.value)">
          {{ item.prop }}
        </button>
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
      title: 'zabbix代理',
      zabbixAgent: [
        { prop: '设备名称', value: '172.16.128.14', type: 'input', slot: '' },
        { prop: '服务器地址', value: '172.16.128.13', type: 'input', slot: '' },
        { prop: '服务端口', value: '10050', type: 'input', slot: '' },
        {
          prop: '备注提示',
          value: '串口需启用TCPServer+ModbusTCP',
          type: 'text',
          slot: ''
        },
        {
          prop: '保存及应用',
          value: '/usr/local/bin/zabbixsave.sh',
          type: 'button',
          slot: ''
        }
      ]
    }
  },
  mounted () {
    // this.fetchData('zabbixAgent')
  },
  methods: {
    getSh (value) {
      this.save()
    },
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 获取最终的数据格式
        // console.log(this.inputInterArr)
        // 写入
        await http.post('/zabbixAgent', { zabbixAgent: this.zabbixAgent, title: this.title })
      }
    }
  }
}
</script>

<style scoped lang="scss">
// h1 {
//   color: #0069d6;
// }
// .select,
// input {
//   width: 180px;
//   height: 24px;
//   outline: none;
//   box-sizing: border-box;
// }
.display {
  display: flex;
}
.left {
  margin-right: 80px;
}
// .content {
//   p {
//     // height: 42px;
//     line-height: 48px;
//     position: relative;
//     .prop {
//       width: 140px;
//       display: inline-block;
//     }
//     .absolute {
//       position: absolute;
//       left: 420px;
//       width: 65px;
//       top: 12px;
//       height: 24px;
//     }
//   }
//   .inputWidth {
//     width: 80px;
//   }

//   // .unit {
//   //   color: #666;
//   // }

//   .radioDisplay {
//     display: flex;
//     flex-wrap: wrap;
//     .radio {
//       width: 30px;
//       height: 20px;
//     }
//     label {
//       margin-right: 10px;
//     }
//     .radioSpan {
//       display: flex;
//       flex-wrap: wrap;
//     }
//     .radioFlex {
//       display: flex;
//       flex-wrap: wrap;
//       align-items: center;
//     }
//   }
//   .textarea {
//     width: 180px;
//     // height: 200px;
//     // padding: 10px;
//     border: 1px solid #ccc;
//     // font-size: 16px;
//     border: none;
//     outline: none;
//     margin: 5px 0;
//   }
// }
//  .btn {
//     background-color: #6490aa;
//     color: #fff;
//     // width: 80px;
//     padding: 8px 15px;
//     border: none;
//     margin-top: 10px;
//   }
//   .btn1 {
//     margin-right: 10px;
//   }
</style>
