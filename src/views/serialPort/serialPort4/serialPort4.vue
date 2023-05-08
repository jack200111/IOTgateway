<!-- 系统 -->
<template>
  <div>
    <port :typeArray="uart4" :title="title"></port>
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
