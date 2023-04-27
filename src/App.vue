<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import http from '@/utils/http'
export default {
  created () {
    http.get('/pathAll').then((res) => {
      console.log(res.data.pathAll)
      // 存到内存
      this.getPathAll(res.data.pathAll)
      // 存到仓库
    })
  },
  methods: {
    getPathAll (val) {
      this.$store.commit('changePathAll', val)
      // 触发仓库
      console.log(this.$store.state.pathAll.pathAll)
    }
  }
}
</script>
<style lang="scss">

</style>
