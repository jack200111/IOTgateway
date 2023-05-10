<template>
  <div class="">
    <!-- 动静态 -->
    <span v-for="(item, index) in typeArrayName" :key="index + 101">
      <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
        <!-- 下拉框 -->
        <template v-if="item.type === 'select'">
          <span class="prop">{{ item.prop }}:</span>
          <select
            class="select"
            v-model="item.selected"
            @change="fn(item)"
          >
            <option
              v-for="(item2, index2) in item.value"
              :key="index2"
              :value="item2"
            >
              <template v-if="item2 === 'ON' || item2 === 'OFF'">
                {{ item2 === 'ON' ? '动态' : '静态' }}
              </template>
              <template v-else>
                {{ item2 }}
              </template>
            </option>
          </select>
          <span class="unit">&nbsp;{{ item.slot }}</span>
        </template>
      </p>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    typeArrayName: { type: Array, required: true }
  },
  methods: {
    fn (item) {
      this.$emit('fn', item)
    }
  }
}
</script>

<style scoped lang="scss"></style>
