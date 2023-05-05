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
        prop: 'IP类型',
        selected: 'OFF',
        label: 'DHCP',
        value: ['OFF', 'ON']
      },
      NoInterSelectArr: {
        prop: 'IP类型',
        selected: 'OFF',
        label: 'DHCP',
        value: ['OFF', 'ON']
      },
      NoInterCar: [
        {
          prop: 'SSID',
          selected: '',
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
    async save () {
      if (confirm('设备重启生效是否继续')) {
        // 获取最终的数据格式
        // console.log(this.inputInterArr)
        const netconfig = [...this.inputInterArr, this.InterSelectArr]
        const wificonfig = [...this.inputNoInterCar, this.NoInterSelectArr, ...this.NoInterCar]
        // 写入
        await http.post('/netconfigPost', { netconfig })
        await http.post('/wificonfigPath', { wificonfig })
      }
    },
    getScanResults () {
      // 获取SSID
      http.get('/getTmp') // 发送GET请求
        .then(response => {
          this.NoInterCar[0].value = [response.data.slice(6)]
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchData () {
      // 有线网卡
      http.get('/myNetwork').then(res => {
        // console.log(res.data.netconfig)
        Object.keys(res.data.netconfig).forEach((item) => {
          // 输入项数组
          this.inputInterArr.forEach((item2) => {
            if (item === item2.label) {
              item2.value = res.data.netconfig[item]
            }
          })
          // 动静态
          if (item === this.InterSelectArr.label) {
            if (this.InterSelectArr.label === 'DHCP') {
              this.InterSelectArr.selected = res.data.netconfig[item]
            }
          }
        })
      })
      // 无线网卡
      http.get('/wificonfig').then(res => {
        // console.log(res.data.wificonfig)
        Object.keys(res.data.wificonfig).forEach((item) => {
          // 输入项数组
          this.inputNoInterCar.forEach((item2) => {
            if (item === item2.label) {
              item2.value = res.data.wificonfig[item]
            }
          })
          // 动静态
          if (item === this.NoInterSelectArr.label) {
            this.NoInterSelectArr.selected = res.data.wificonfig[item]
          }
          // 密码
          this.NoInterCar.forEach((item2) => {
            // if (item === item2.label) {
            if (item2.label === 'Passwd') {
              item2.value = res.data.wificonfig[item]
            }
            // SSID
            // if (item2.label === 'SSID') {
            //   item2.value = res.data.wificonfig[item].split(',')
            // }
            // }
          })
        })
      })
    }
  },
  mounted () {
    // 请求数据
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
