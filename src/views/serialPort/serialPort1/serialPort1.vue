<!-- 系统 -->
<template>
  <div>
    <port :typeArray="uart1" :title="title" @fn="getSh2"></port>
  </div>
</template>

<script>
import http from '@/utils/http'
import myMixin from '@/mixin/getIniData'
import port from '@/components/port.vue'
export default {
  components: {
    port
  },
  mixins: [myMixin],
  data () {
    return {
      title: '',
      uart1: [],
      oldPort: '',
      newPort: ''
    }
  },
  mounted () {
    this.fetchData('uart1')
  },
  methods: {
    // 保存串口
    async save1 (value) {
      let val = null
      this.uart1.forEach((item) => {
        if (item.prop === '本地端口') {
          val = item
        }
      })
      return val
    },
    async save (value) {
      await http.post('/uart1', { UART1: this.uart1, title: this.title })
    }
  }
}
</script>

<style scoped lang="scss">
.selectMarginRight {
  margin-right: 10px;
}
</style>
