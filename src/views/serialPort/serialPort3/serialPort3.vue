<!-- 网络 -->
<template>
  <div class="content">
    <h1>配置设置</h1>
    <div>
      <p>
        <span>{{ inputBaudrate.prop }}</span
        ><input type="text" :value="inputBaudrate.value" />
        <span class="unit">&nbsp;{{ inputBaudrate.slot }}</span>
      </p>
      <p v-for="(item, index) in SelectArr" :key="index">
        <span>{{ item.prop }}</span>
        <template v-if="item.label !== 'TYPE'">
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
        <template v-else>
          <select class="select" v-model="item.selected" disabled>
            <option
              v-for="(item2, index2) in item.value"
              :key="index2"
              :value="item2"
            >
              {{ item2 }}
            </option>
          </select>
        </template>
        <span class="unit" v-if="item.slot">&nbsp;{{ item.slot }}</span>
      </p>
      <div>
        <span>工作方式</span>
        <div class="inlineBlockDiv">
          <select
            class="select selectMarginRight"
            v-model="SelectProp[0].selected"
          >
            <option
              v-for="(item2, index2) in SelectProp[0].value"
              :key="index2"
              :value="item2"
            >
              {{ item2 }}
            </option>
          </select>
          <span class="unit" v-if="SelectProp[0].slot"
            >&nbsp;{{ SelectProp[0].slot }}</span
          >
        </div>
        <div class="inlineBlockDiv">
          <select
            class="select selectMarginRight"
            v-model="SelectProp[1].selected"
          >
            <option
              v-for="(item2, index2) in SelectProp[1].value[
                SelectProp[0].selected
              ]"
              :key="index2"
              :value="item2"
            >
              {{ item2 }}
            </option>
          </select>
          <span class="unit">&nbsp;{{ SelectProp[1].slot }}</span>
        </div>
      </div>
      <p>
        <span>{{ inputPORT.prop }}</span
        ><input type="text" class="smallInput" :value="inputPORT.value" />
        <span class="unit">&nbsp;{{ inputPORT.slot }}</span>
      </p>
    </div>
    <!-- <p>Database Baudrate: {{ config }}</p> -->
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
import configIni from '@/config/uart3.ini'
export default {
  mounted () {
    this.config = configIni.uart3
    this.inputBaudrate.value = configIni.uart3.Baudrate.split(',')[0]
    Object.keys(configIni.uart3).forEach((item) => {
      this.SelectArr.forEach((item2) => {
        if (item === item2.label) {
          item2.value = configIni.uart3[item].split(',')
        }
      })
      this.SelectProp.forEach((item2) => {
        if (item === item2.label) {
          if (item2.label === 'Service') {
            item2.value = configIni.uart3[item].split(',')
          }
        }
      })
    })
    this.inputPORT.value = configIni.uart3.PORT
  },
  data () {
    return {
      config: '',
      isWired: false,
      SelectArr: [
        {
          prop: '数据位',
          label: 'Databits',
          selected: '8',
          value: ['8', '6'],
          slot: 'bit'
        },
        {
          prop: '校验位',
          label: 'Parity',
          selected: 'Even',
          value: ['None', 'Even', 'Odd']
        },
        {
          prop: '停止位',
          label: 'Stopbits',
          selected: '1',
          value: ['1', '2']
        },
        {
          prop: '当前串口模式',
          label: 'TYPE',
          selected: 'RS485',
          value: ['RS485', 'RS232']
        },
        {
          prop: '流控模式',
          label: 'FlowControl',
          selected: 'NONE',
          value: ['NONE', 'XON/XOFF']
        }
      ],
      SelectProp: [
        {
          label: 'Service',
          selected: 'TCPServer',
          value: ['TCPServer', 'Websocket']
        },
        {
          label: 'FlowControl',
          selected: 'None',
          value: { TCPServer: ['None', 'ModbusTCP'], Websocket: ['None'] }
        }
      ],
      inputBaudrate: {
        prop: '波特率',
        label: 'Baudrate',
        value: '115200',
        slot: '(600~921600)bps'
      },
      inputPORT: {
        prop: '本地端口',
        label: 'PORT',
        value: '1030',
        slot: '(1~65535)'
      }
    }
  },
  methods: {
    getValue () {
      // router.push('/myHome/mySystem')
    },
    save () {
      this.readIniFile()
      if (confirm('设备重启生效是否继续')) {
        //
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: #0069d6;
  margin-bottom: 20px;
}
.select,
input {
  width: 180px;
  height: 24px;
  outline: none;
  box-sizing: border-box;
  text-indent: 0.5em;
}
p {
  margin-bottom: 10px;
}
span {
  width: 140px;
  display: inline-block;
}

.btn {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
}
.btn1 {
  background-color: #6490aa;
  color: #fff;
  margin-right: 10px;
}
.unit {
  color: #666;
}
.smallInput {
  width: 70px;
}
.inlineBlockDiv {
  display: inline-block;
  margin-bottom: 10px;
}
.selectMarginRight {
  margin-right: 10px;
}
</style>
