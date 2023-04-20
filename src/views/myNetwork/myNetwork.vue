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
              {{ item2 }}
            </option>
          </select>
        </p>
        <p
          v-for="item in inputInterArr"
          :key="item.prop"
          v-show="InterSelectArr.selected === '动态'"
        >
          <span>{{ item.prop }}</span
          ><input type="text" disabled :value="item.value" />
        </p>
        <p
          v-for="item in inputInterArr"
          :key="item.prop + '1'"
          v-show="InterSelectArr.selected === '静态'"
        >
          <span>{{ item.prop }}</span
          ><input type="text" :value="item.value" />
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
                {{ item2 }}
              </option>
            </select>
          </p>
          <div v-show="NoInterSelectArr.selected === '静态'">
            <p
              v-for="item in inputNoInterCar"
              :key="item.prop"
            >
              <span>{{ item.prop }}</span
              ><input type="text" disabled :value="item.value" />
            </p>
            <p>
              <span>{{ NoInterCar[0].prop }}</span>
              <select class="select" v-model="inputNoInterCar[0].selected" disabled>
                <option
                  v-for="(item2, index2) in inputNoInterCar[0].value"
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
              disabled
              :value="NoInterCar[1].value"
            />
          </p>
          </div>
          <div v-show="NoInterSelectArr.selected === '动态'">
            <p v-for="item in inputNoInterCar" :key="item.prop + '1'">
              <span>{{ item.prop }}</span
              ><input type="text" :value="item.value" />
            </p>
            <p>
              <span>{{ NoInterCar[0].prop }}</span>
              <select class="select" v-model="NoInterCar[0].selected" >
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
              :value="NoInterCar[1].value"
            />
          </p>
          </div>
        </div>
      </div>
    </div>
    <button @click="getValue" class="btn btn1">扫描</button>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
import netConfig from '@/config/netconfig.conf'
import wifiConfig from '@/config/wificonfig.conf'
export default {
  data () {
    return {
      isWired: false,
      inputInterArr: netConfig.inputInterArr,
      inputNoInterCar: wifiConfig.inputNoInterCar,
      InterSelectArr: netConfig.InterSelectArr,
      InterCar: netConfig.InterCar,
      // NoInterCar: wifiConfig.NoInterCar,
      NoInterSelectArr: wifiConfig.InterSelectArr,
      NoInterCar: [
        {
          prop: 'SSID',
          label: 'SSID',
          value: ['']// ruien
        },
        {
          prop: '密码',
          label: 'Passwd',
          value: '21680186'
        }
      ]
    }
  },
  methods: {
    getValue () {
      // router.push('/myHome/mySystem')
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/src/tmp/iwscan.tmp')
      xhr.onload = () => {
        console.log(xhr.responseText)
        this.data = xhr.responseText
      }
      xhr.send()
    },
    save () {
      confirm('设备重启生效是否继续')
    }
  },
  mounted () {
    console.log(netConfig.inputArr)
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
