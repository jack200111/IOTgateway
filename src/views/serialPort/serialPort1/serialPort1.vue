<!-- 系统 -->
<template>
  <div>
    <port :typeArray="uart1" :title="title"></port>
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
    async save () {
      console.log('uart1')
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
