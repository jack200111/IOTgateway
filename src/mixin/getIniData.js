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
    getSh (value, item) {
      http.post('/postSh', { value }).then(res => {
      })
      // 写入
      this.save(item)
    }
  }
}
