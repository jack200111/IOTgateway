<!-- 网络 -->
<template>
  <div class="content">
    <!-- <h1>{{isWired?'有线网卡':'无线网卡'}}</h1> -->
    <div class="display">
      <!-- 有线网卡 -->
      <div class="InterCar">
        <h1>有线网卡</h1>
        <p>
          <span>{{ InterSelectArr.prop }}</span>
          <select class="select" v-model="InterSelectArr.selected">
            <option
              v-for="(item2, index2) in InterSelectArr.value"
              :key="index2"
              :value="item2"
            >
              {{ item2==='ON'?'动态':'静态' }}
            </option>
          </select>
        </p>
        <p
          v-for="item in inputInterArr"
          :key="item.prop"
        >
          <span>{{ item.prop }}</span
          ><input type="text" :disabled="InterSelectArr.selected === 'ON'" v-model="item.value" />
        </p>
      </div>
      <!-- 无线网卡 -->
      <div>
        <h1>无线网卡</h1>
        <div>
          <p>
            <span>{{ NoInterSelectArr.prop }}</span>
            <select class="select" v-model="NoInterSelectArr.selected">
              <option
                v-for="(item2, index2) in NoInterSelectArr.value"
                :key="index2"
                :value="item2"
              >
                  {{ item2==='ON'?'动态':'静态' }}
              </option>
            </select>
          </p>
          <div >
            <p
              v-for="item in inputNoInterCar"
              :key="item.prop"
            >
              <span>{{ item.prop }}</span
              ><input type="text" :disabled="NoInterSelectArr.selected === 'ON'" v-model="item.value" />
            </p>
            <p>
              <span>{{ NoInterCar[0].prop }}</span>
              <select class="select" v-model="NoInterCar[0].selected" :disabled="NoInterSelectArr.selected === 'ON'">
                <option
                  v-for="(item2, index2) in NoInterCar[0].value"
                  :key="index2"
                  :value="item2"
                >
                  {{ item2 }}
                </option>
              </select>
            </p>
            <p>
              <span>{{ NoInterCar[1].prop }}</span
              ><input
                type="password"
                :disabled="NoInterSelectArr.selected === 'ON'"
                v-model="NoInterCar[1].value"
              />
          </p>
          </div>
        </div>
      </div>
    </div>
    <button @click="getScanResults" class="btn btn1">扫描</button>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
// import wifiConfig from '@/config/wificonfig.conf'
import axios from 'axios'
// import parseIni from '@/utils/getIni'
import http from '@/utils/http'
export default {
  data () {
    return {
      isWired: false,
      inputInterArr: [
        {
          prop: 'IP地址',
          value: '172.16.128.15',
          label: 'IP'
        },
        {
          prop: '子网掩码',
          label: 'Subnet',
          value: '255.255.255.1'
        },
        {
          prop: '网关',
          label: 'Gateway',
          value: '172.16.128.255'
        },
        {
          prop: 'DNS',
          label: 'DNS',
          value: '114.114.114.115'
        }
      ],
      inputNoInterCar: [
        {
          prop: 'IP地址',
          value: '172.16.128.12',
          label: 'IP'
        },
        {
          prop: '子网掩码',
          label: 'Subnet',
          value: '255.255.255.1'
        },
        {
          prop: '网关',
          label: 'Gateway',
          value: '172.16.128.255'
        },
        {
          prop: 'DNS',
          label: 'DNS',
          value: '114.114.114.115'
        }
      ],
      InterSelectArr: {
        selected: 'OFF',
        prop: 'IP类型',
        label: 'DHCP',
        value: ['OFF', 'ON']
      },
      NoInterSelectArr: {
        selected: 'OFF',
        prop: 'IP类型',
        label: 'DHCP',
        value: ['OFF']
      },
      NoInterCar: [
        {
          prop: 'SSID',
          selected: [],
          label: 'SSID',
          value: []// ruien
        },
        {
          prop: '密码',
          label: 'Passwd',
          value: ''
        }
      ]
    }
  },
  methods: {
    changeVal (e) {
      console.log(e)
    },
    getValue () {
      // router.push('/myHome/mySystem')
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://localhost:3000/src/tmp/iwscan.tmp')
      xhr.onload = () => {
        console.log(xhr.responseText)
        this.data = xhr.responseText
      }
      xhr.send()
    },
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 获取最终的数据格式
        // axios.post('http://localhost:3000/saveNetconfig', this.inputInterArr).then(res => {
        //   console.log(res)
        // })
        console.log(this.inputInterArr)
        console.log(this.InterSelectArr)
        const netconfig = [...this.inputInterArr, this.InterSelectArr]
        const wificonfig = [...this.inputNoInterCar, this.NoInterSelectArr, ...this.NoInterCar]
        console.log({ wificonfig: netconfig })
        const res = await http.post('/netconfigPost', { netconfig })
        const res2 = await http.post('/wificonfigPath', { wificonfig })
        console.log(res)
        console.log(res2)
        // console.log(this.inputNoInterCar)
        // console.log(this.NoInterSelectArr)
        // console.log(this.NoInterCar)
      }
    },
    getScanResults () {
      axios.get('http://localhost:3000/read_scan_results') // 发送GET请求
        .then(response => {
          // this.ssids = response.data.split('\n').filter(Boolean) // 将响应数据转换为数组并过滤掉空字符串
          // console.log(response.data.split('\n').filter(Boolean))
          // const ssidList = []
          // console.log(response.data.split('\n'))
          // const lines = response.data.split('\n')
          // for (const line of lines) {
          //   if (line.startsWith('SSID: ')) {
          //     const ssid = line.slice(6) // 提取 SSID 数据
          //     ssidList.push(ssid) // 添加到数组中
          //   }
          // }
          // console.log(ssidList[0])
          console.log(response.data.slice(6))
          this.NoInterCar[0].value = [response.data.slice(6)]
          console.log(this.NoInterCar[0])
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchData () {
      axios.get('http://localhost:3000/myNetwork').then(res => {
        console.log(res.data.netconfig)
        Object.keys(res.data.netconfig).forEach((item) => {
          this.inputInterArr.forEach((item2) => {
            if (item === item2.label) {
              console.log(item2)
              item2.value = res.data.netconfig[item]
            }
          })
          if (item === this.InterSelectArr.label) {
            if (this.InterSelectArr.label === 'DHCP') {
              this.InterSelectArr.value = res.data.netconfig[item].split(',')
            }
          }
        })
      })
      axios.get('http://localhost:3000/wificonfig').then(res => {
        console.log(res.data.wificonfig)
        Object.keys(res.data.wificonfig).forEach((item) => {
          this.inputNoInterCar.forEach((item2) => {
            if (item === item2.label) {
              console.log(item2)
              item2.value = res.data.wificonfig[item]
            }
          })
          if (item === this.NoInterSelectArr.label) {
            if (this.NoInterSelectArr.label === 'DHCP') {
              this.NoInterSelectArr.value = res.data.wificonfig[item].split(',')
            }
          }
          this.NoInterCar.forEach((item2) => {
            if (item === item2.label) {
              if (item2.label === 'Passwd') {
                item2.value = res.data.wificonfig[item]
              }
            }
          })
        })
      })
      // axios.get('http://localhost:3000/netconfig').then(res => {
      //   console.log(res)
      // })
    }
  },
  mounted () {
    // console.log(parseIni)
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
h1 {
  color: #0069d6;
  margin-bottom: 20px;
}
// .content {
//   padding: 20px;
// }
.select,
input {
  width: 180px;
  height: 24px;
  outline: none;
  box-sizing: border-box;
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
.display {
  display: flex;
}
.InterCar {
  margin-right: 80px;
}
</style>
