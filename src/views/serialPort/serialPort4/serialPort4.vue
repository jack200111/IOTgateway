<!-- 系统 -->
<template>
  <div>
    <port :typeArray="uart4" :title="title" @fn="getSh2"></port>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
import port from '@/components/port.vue'
export default {
  mixins: [myMixin],
  components: {
    port
  },
  data () {
    return {
      title: '',
      uart4: [],
      oldPort: '',
      newPort: ''
    }
  },
  mounted () {
    this.fetchData('uart4')
  },
  methods: {
    // 保存串口
    async save1 (value) {
      let val = null
      this.uart4.forEach((item) => {
        if (item.prop === '本地端口') {
          val = item
        }
      })
      return val
    },
    async save () {
      await http.post('/uart4', { UART3: this.uart4, title: this.title })
    }
  }
}
</script>

<style scoped lang="scss">
.selectMarginRight {
  margin-right: 10px;
}
</style>
