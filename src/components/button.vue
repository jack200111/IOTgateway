<template>
  <div class="">
    <span v-for="item in typeArray" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="fn(item.value, item)">
          {{ item.prop }}
        </button>
        <span class="unit">&nbsp;{{ item.slot }}</span>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    typeArray: { type: Array, required: true }
  },
  methods: {
    fn (value, item) {
      this.$emit('fn2', value, item)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
