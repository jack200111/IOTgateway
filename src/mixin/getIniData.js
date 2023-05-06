import http from '@/utils/http'
export default {
  methods: {
    fetchData (val) {
      // 请求数据
      // http.get('/' + val).then(res => {
      //   Object.keys(res.data[val]).forEach((item) => {
      //     const value = res.data[val][item]
      //     // 下拉框
      //     if (value.split(',').length > 2) {
      //       this[val].push({ prop: value.split(',')[0], value: value.split(',').splice(1), selected: value.split(',')[1], label: item })
      //     } else { // 输入框
      //       this[val].push({ prop: value.split(',')[0], value: value.split(',').splice(1).join(''), label: item })
      //     }
      //   })
      //   console.log(this[val])
      // })
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
              this.oldPort = valueArr[1]
              this.newPort = valueArr[1]
              console.log(this.oldPort)
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
      this.newPort = val
      console.log(this.newPort)
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
    getSh2 (value, item) {
      // 先判断
      const arr = JSON.parse(localStorage.getItem('portArr'))
      console.log(this.oldPort, 'oldPort')
      console.log(this.newPort, 'newPort')
      if (this.oldPort !== this.newPort && arr.includes(this.oldPort)) {
        alert(this.newPort + '端口已经存在,请勿使用端口:' + arr.filter(item => item !== this.oldPort).join(','))
        return
      }
      http.post('/postSh', { value }).then(res => {})
      // 写入
      this.save(item)
    }
  }
}
