<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
export default {
  mixins: [myMixin],
  data () {
    return {
      portAll: ''
    }
  },
  mounted () {
    this.fetchData('portAll')
  },
  created () {
  },
  methods: {
    fetchData (val) {
      http.get('/' + val).then((res) => {
        // 对象数据
        const data = res.data[Object.keys(res.data)]
        // item:中文键名
        Object.keys(data).forEach((item) => {
          const valueArr = data[item].split(',')
          const portArr = valueArr
          // console.log(valueArr)
          // 存到本地
          localStorage.setItem('portArr', JSON.stringify(portArr))
          const arr = JSON.parse(localStorage.getItem('portArr'))
          console.log(arr)
        })
      })
    }
  }
}
</script>
<style lang="scss">

</style>
