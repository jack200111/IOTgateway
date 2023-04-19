<!-- 网络 -->
<template>
  <div class="content">
    <h1>{{isWired?'有线网卡':'无线网卡'}}</h1>
    <!-- 有线网卡 -->
    <div v-show="isWired">
      <p>
      <span>{{selectArr.prop}}</span>
      <select
        class="select"
        v-model="selectArr.selected"
      >
        <option
        v-for="(item2, index2) in selectArr.value"
        :key="index2"
        :value="item2"
        >
          {{ item2 }}
        </option>
      </select>
    </p>
    <p v-for="(item) in inputArr" :key="item.prop" v-show="selectArr.selected==='动态'">
      <span>{{item.prop}}</span><input type="text" disabled :value="item.value" />
    </p>
    <p v-for="(item) in inputArr" :key="item.prop +'1'" v-show="selectArr.selected==='静态'">
      <span>{{item.prop}}</span><input type="text"  :value="item.value" />
    </p>
    </div>
    <!-- 无线网卡 -->
    <div v-show="!isWired">
       <div>
      <p>
      <span>{{selectArr.prop}}</span>
      <select
        class="select"
        v-model="selectArr.selected"
      >
        <option
        v-for="(item2, index2) in selectArr.value"
        :key="index2"
        :value="item2"
        >
          {{ item2 }}
        </option>
      </select>
    </p>
    <p v-for="(item) in inputArr" :key="item.prop" v-show="selectArr.selected==='动态'">
      <span>{{item.prop}}</span><input type="text" disabled :value="item.value" />
    </p>
    <p v-for="(item) in inputArr" :key="item.prop +'1'" v-show="selectArr.selected==='静态'">
      <span>{{item.prop}}</span><input type="text"  :value="item.value" />
    </p>
    </div>
    <p>
      <span>{{NoInterCar[0].prop}}</span>
      <select
        class="select"
        v-model="NoInterCar[0].selected"
      >
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
      <span>{{NoInterCar[1].prop}}</span><input type="password" disabled :value="NoInterCar[1].value" />
    </p>
    </div>
    <button @click="getValue" class="btn btn1">扫描</button>
    <button @click="save" class="btn btn1">保存及应用</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isWired: false,
      selectArr: {
        selected: '静态',
        prop: 'IP类型',
        label: 'DHCP',
        value: ['静态', '动态']
      },
      NoInterCar: [
        {
          prop: 'SSID',
          label: 'SSID',
          value: ['ruien']
        },
        {
          prop: '密码',
          label: 'Passwd',
          value: '21680186'
        }
      ],
      inputArr: [
        {
          prop: 'IP地址',
          value: '192.16.128.14'
        },
        {
          prop: '子网掩码',
          label: 'Subnet',
          value: '255.255.255.0'
        },
        {
          prop: '网关',
          label: 'Gateway',
          value: '172.16.128.254'
        },
        {
          prop: 'DNS',
          label: 'DNS',
          value: '114.114.114.114'
        }
      ]
    }
  },
  methods: {
    getValue () {
      // router.push('/myHome/mySystem')
    },
    save () {
      confirm('设备重启生效是否继续')
    }
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

 .btn{
      margin-top: 10px;
      padding:8px 16px;
      border: none;
    }
    .btn1{
      background-color: #6490aa;
      color: #fff;
      margin-right: 10px;
    }
</style>
