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
// import IniParser from 'ini-parser'
// import fs from 'fs'
import configIni from '@/config/uart1.ini'
export default {
  mounted () {
    // this.updateIniFile()
    this.config = configIni.uart1
    console.log(this.config)
    this.inputBaudrate.value = configIni.uart1.Baudrate.split(',')[0]
    // this.SelectArr[0].value = configIni.uart1.Databits.split(',')
    Object.keys(configIni.uart1).forEach((item) => {
      console.log(item)
      this.SelectArr.forEach((item2) => {
        if (item === item2.label) {
          item2.value = configIni.uart1[item].split(',')
        }
      })
      this.SelectProp.forEach((item2) => {
        if (item === item2.label) {
          if (item2.label === 'Service') {
            item2.value = configIni.uart1[item].split(',')
          }
        }
      })
    })
    this.inputPORT.value = configIni.uart1.PORT
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
        this.updateIniFile()
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
      // const parser = new IniParser()
      // fetch('/src/config/uart1.ini')
      //   .then(response => response.text())
      //   .then(iniData => {
      //     console.log(parser)
      //     console.log(iniData)
      //     // const config = parser.parse(iniData)
      //     // config.Baudrate = 'newpassword'
      //     // const newIniData = parser.stringify(config)
      //     // fetch('/src/config/uart1.ini', {
      //     //   method: 'PUT',
      //     //   body: newIniData,
      //     //   headers: {
      //     //     'Content-Type': 'text/plain;charset=UTF-8'
      //     //   }
      //     // })
      //   })
    }
  },
  watch: {
    // SelectProp: {
    //   handler (newValue, OldValue) {
    //     console.log(newValue, OldValue)
    //     if (newValue[0].selected === 'TCPServer') {
    //       newValue[1].selected = ['None', 'ModbusTCP']
    //     } else {
    //       newValue[1].selected = ['None']
    //     }
    //   },
    //   deep: true, // 可以深度检测到 obj 对象的属性值的变化
    //   immediate: true// 刷新加载  立马触发一次handler
    // }
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
