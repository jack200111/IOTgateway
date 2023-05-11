import http from '@/utils/http'
export default {
  methods: {
    fetchData (val) {
      // 请求数据
      http.get('/' + val).then((res) => {
        // 标题
        if (this.title) {
          this.title2 = Object.keys(res.data)[0]
        } else {
          this.title = Object.keys(res.data)[0]
        }
        // 对象数据
        const data = res.data[Object.keys(res.data)]
        // item:中文键名
        Object.keys(data).forEach((item) => {
          const value = data[item]
          const valueArr = data[item].split(',')
          // 静态文本 按钮
          if (value.split(',')[0] === 'text' || value.split(',')[0] === 'button' || value.split(',')[0] === 'smallInput' || value.split(',')[0] === 'input' || value.split(',')[0] === 'checkbox' || value.split(',')[0] === 'textarea') {
            this[val].push({
              prop: item,
              value: valueArr[1],
              type: valueArr[0],
              slot: valueArr[2] && valueArr[2]
            })
            if (item === '本地端口') {
              this.oldPort = parseInt(valueArr[1])
              // console.log(this.oldPort)
            }
          } else if (value.split(',')[0] === 'select' && item === '工作方式') {
            this[val].push({
              prop: item,
              type: valueArr[0],
              value: [{
                prop: item,
                value: valueArr.slice(2, 4),
                selected: valueArr[1]
              }, {
                prop: item,
                value: valueArr.slice(5, valueArr.length - 1),
                selected: valueArr[4],
                slot: valueArr[valueArr.length - 1]
              }
              ]
            })
          } else if (value.split(',')[0] === 'select' || value.split(',')[0] === 'radio') {
            this[val].push({
              prop: item,
              value: valueArr.slice(2, valueArr.length - 1),
              type: valueArr[0],
              selected: valueArr[1],
              slot: valueArr[valueArr.length - 1]
            })
            if (item === 'IP类型' && val === 'netconfig') {
              // console.log(this.netconfigDisable)
              if (valueArr[1] === 'OFF') {
                this.netconfigDisable = false
              } else {
                this.netconfigDisable = true
              }
            }
            if (item === 'IP类型' && val === 'wificonfig') {
              // console.log(this.wificonfigDisable)
              if (valueArr[1] === 'OFF') {
                this.wificonfigDisable = false
              } else {
                this.wificonfigDisable = true
              }
            }
          }
        })
      })
    },
    // 除串口页面
    getSh (value, item) {
      http.post('/postSh', { value }).then(res => {
      })
      // 写入
      this.save(item)
    },
    // 端口改变
    changePort (val) {
      this.newPort = parseInt(val)
      // console.log(this.newPort)
    },
    // 改变工作方式
    onCountryChange (item) {
      const valueArr = item.value
      if (valueArr[0].selected === 'TCPServer') {
        valueArr[1].value = ['None', 'ModbusTCP']
      } else if (valueArr[0].selected === 'Websocket') {
        valueArr[1].value = ['None']
      }
    },
    // 串口页面
    async getSh2 (value) {
      // 先判断
      const arr = JSON.parse(localStorage.getItem('portArr'))
      const newPort = await this.save1()
      let newPortVal = parseInt(newPort.value)
      // console.log(this.oldPort, 'oldPort')
      // console.log(newPort, 'newPort')
      if (this.oldPort !== newPortVal && arr.includes(newPortVal)) {
        alert(newPortVal + '端口已经存在,请勿使用端口:' + arr.filter(item => item !== this.oldPort).join(','))
        newPort.value = this.oldPort
        newPortVal = this.oldPort
        // console.log(newPort)
        return
      }
      http.post('/postSh', { value }).then(res => {})
      // 写入
      this.save()
      // 获取之前的旧端口
      const arr2 = JSON.parse(localStorage.getItem('portArr'))
      // 获取新端口，替换旧端口
      const i = arr2.findIndex((item) => item === parseInt(this.oldPort))
      // console.log(i)
      // console.log(arr2)
      // console.log(parseInt(this.oldPort))
      if (i === -1) {
        arr2.push(newPortVal)
        arr2.sort(function (a, b) {
          return a - b
        })
      } else {
        arr2[i] = newPortVal
      }
      // console.log(arr2[i])
      // console.log(newPortVal)
      // console.log(arr2)
      // 本地存储端口键值
      localStorage.setItem('portArr', JSON.stringify(arr2))
      // 重新修改旧的值，用于下次判断
      this.oldPort = newPortVal
      // 临时存储端口键名
      const protName = sessionStorage.getItem('protName')
      // 修改记录端口
      http.post('/portAll', { portAll: arr2, title: 'portAll', protName }).then((res) => {})
    }
  }
}
