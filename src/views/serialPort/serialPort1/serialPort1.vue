<!-- 网络 -->
<template>
  <div class="content">
    <h1>配置设置</h1>
    <div>
      <!-- 波特率 -->
      <p>
        <span>{{ inputBaudrate.prop }}</span
        ><input type="text" v-model="inputBaudrate.selected" />
        <span class="unit">&nbsp;{{ inputBaudrate.slot }}</span>
      </p>
      <!-- 输入框 -->
      <p v-for="(item, index) in SelectArr" :key="index">
        <span>{{ item.prop }}</span>
        <template>
          <select class="select" v-model="item.selected" >
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
        <!-- 工作方式 第一个下拉框 -->
        <div class="inlineBlockDiv">
          <select
            class="select selectMarginRight"
            v-model="SelectProp[0].selected"
            @change="onCountryChange"
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
        <!-- 工作方式 第二个下拉框 -->
        <div class="inlineBlockDiv">
          <select
            class="select selectMarginRight"
            v-model="SelectProp[1].selected"
          >
            <option
              v-for="(item2, index2) in SelectProp[1].value"
              :key="index2"
              :value="item2"
            >
              {{ item2 }}
            </option>
          </select>
          <span class="unit">&nbsp;{{ SelectProp[1].slot }}</span>
        </div>
      </div>
      <!-- 本地端口 -->
      <p>
        <span>{{ inputPORT.prop }}</span
        ><input type="text" class="smallInput" v-model="inputPORT.value" />
        <span class="unit">&nbsp;{{ inputPORT.slot }}</span>
      </p>
    </div>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  mounted () {
    this.fetchData()
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
          label: 'ModbusTCP',
          selected: 'None',
          value: ['None', 'ModbusTCP']
        }
      ],
      ModbusTCP: {
        label: 'ModbusTCP',
        selected: 'ON'
      },
      SelectAll: ['None', 'ModbusTCP', 'None'],
      inputBaudrate: {
        prop: '波特率',
        label: 'Baudrate',
        selected: '115200',
        slot: '(600~921600)bps'
      },
      inputPORT: {
        prop: '本地端口',
        label: 'PORT',
        selected: '1030',
        slot: '(1~65535)'
      }
    }
  },
  methods: {
    async save () {
      this.readIniFile()
      if (confirm('设备重启生效是否继续')) {
        const UART1 = [...this.SelectArr, this.SelectProp[0], this.ModbusTCP, this.inputBaudrate, this.inputPORT]
        // 写入
        const res = await http.post('/serialPort1', { UART1 })
        console.log(res)
      }
    },
    fetchData () {
      http.get('/serialPort1').then(res => {
        // console.log(res.data.UART1)
        Object.keys(res.data.UART1).forEach((item) => {
          // 输入框
          this.SelectArr.forEach((item2) => {
            if (item === item2.label) {
              item2.selected = res.data.UART1[item]
            }
          })
          // 工作方式
          this.SelectProp.forEach((item2) => {
            // 第一个下拉框 Service
            if (item === item2.label && item === 'Service') {
              this.SelectProp[0].selected = res.data.UART1[item]
            }
            // 第二个下拉框 Service
            if (item2.label === 'ModbusTCP') {
              this.ModbusTCP.selected = res.data.UART1[item]
              if (res.data.UART1[item] === 'NO') {
                this.SelectProp[1].selected = 'None'
              } else if (res.data.UART1[item] === 'OFF') {
                this.SelectProp[1].selected = 'None'
              }
            }
          })
          // this.SelectProp.forEach((item2) => {
          //   if (item === item2.label) {
          //     // if (item === 'Service' || item === 'FlowControl') {
          //     item2.selected = res.data.UART1[item]
          //     // }
          //     // if (item === 'FlowControl') {
          //     //   item2.selected = res.data.UART1[item]
          //     // }
          //   }
          // })
          // if (item === this.InterSelectArr.label) {
          //   if (this.InterSelectArr.label === 'DHCP') {
          //     this.InterSelectArr.value = res.data.UART1[item].split(',')
          //   }
          // }
          if (item === this.inputBaudrate.label) {
            this.inputBaudrate.selected = res.data.UART1[item]
          }
          if (item === this.inputPORT.label) {
            this.inputPORT.value = res.data.UART1[item]
          }
        })
      })
    },
    onCountryChange () {
      if (this.SelectProp[0].selected === 'TCPServer') {
        this.SelectProp[1].value = ['None', 'ModbusTCP']
        this.ModbusTCP.selected = 'ON'
      } else if (this.SelectProp[0].selected === 'Websocket') {
        this.SelectProp[1].value = ['None']
        this.ModbusTCP.selected = 'OFF'
      }
    },
    readIniFile () {
      // const fileInput = document.createElement('input')
      // fileInput.type = 'file'
      // fileInput.accept = '.ini'
      // fileInput.addEventListener('change', (event) => {
      //   const file = event.target.files[0]
      //   const reader = new FileReader()
      //   reader.onload = (e) => {
      //     const iniData = e.target.result
      //     const parser = new IniParser()
      //     const config = parser.parse(iniData)
      //     console.log(config)
      //   }
      //   reader.readAsText(file)
      // })
      // fileInput.click()
    },
    updateIniFile () {
    //
    }
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
