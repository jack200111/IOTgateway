import http from '@/utils/http'
export default {
  methods: {
    fetchData (val) {
      // 请求数据
      http.get('/' + val).then(res => {
        Object.keys(res.data[val]).forEach((item) => {
          const value = res.data[val][item]
          // 下拉框
          if (value.split(',').length > 2) {
            this[val].push({ prop: value.split(',')[0], value: value.split(',').splice(1), selected: value.split(',')[1], label: item })
          } else { // 输入框
            this[val].push({ prop: value.split(',')[0], value: value.split(',').splice(1).join(''), label: item })
          }
        })
        console.log(this[val])
      })
    }
  }
}
